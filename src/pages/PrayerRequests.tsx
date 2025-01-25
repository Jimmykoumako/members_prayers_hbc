import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ScrollArea } from "../components/ui/scroll-area";
import { PrayerRequestForm } from './PrayerRequestForm';

interface PrayerRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  is_permanent: boolean;
  status: string;
  created_at: string;
  member: {
    first_name: string;
    last_name: string;
  };
}

export default function PrayerRequests() {
  const { user } = useAuth();
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchPrayers();
  }, [filter]);

  async function fetchPrayers() {
    try {
      let query = supabase
        .from('prayer_requests')
        .select(`
          *,
          member:members (
            first_name,
            last_name
          )
        `)
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        if (filter === 'permanent') {
          query = query.eq('is_permanent', true);
        } else {
          query = query.eq('status', filter);
        }
      }

      const { data, error } = await query;
      if (error) throw error;
      setPrayers(data || []);
    } catch (error) {
      console.error('Error fetching prayers:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(formData: any) {
    try {
      const { error } = await supabase
        .from('prayer_requests')
        .insert([{
          ...formData,
          member_id: user?.id
        }]);
      if (error) throw error;
      fetchPrayers();
    } catch (error) {
      console.error('Error adding prayer request:', error);
      throw error;
    }
  }

  async function updatePrayerStatus(id: string, status: string) {
    try {
      const { error } = await supabase
        .from('prayer_requests')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
      fetchPrayers();
    } catch (error) {
      console.error('Error updating prayer status:', error);
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-96">Loading prayer requests...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Prayer Requests</h1>
        <Button onClick={() => setDialogOpen(true)}>
          Add Prayer Request
        </Button>
      </div>

      {/* Prayer Request Form Dialog */}
      <PrayerRequestForm
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
      />

      {/* Filters */}
      <div className="flex gap-2">
        {['all', 'active', 'answered', 'permanent'].map((filterOption) => (
          <Button
            key={filterOption}
            variant={filter === filterOption ? "default" : "outline"}
            onClick={() => setFilter(filterOption)}
          >
            {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
          </Button>
        ))}
      </div>

      {/* Prayer Requests List */}
      <ScrollArea className="h-[600px] rounded-md border">
        <div className="space-y-4 p-4">
          {prayers.map((prayer) => (
            <Card key={prayer.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{prayer.title}</CardTitle>
                    <CardDescription>
                      By {prayer.member.first_name} {prayer.member.last_name} •
                      {new Date(prayer.created_at).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    {prayer.is_permanent && (
                      <Badge variant="secondary">Permanent</Badge>
                    )}
                    <select
                      value={prayer.status}
                      onChange={(e) => updatePrayerStatus(prayer.id, e.target.value)}
                      className="text-sm border rounded p-1"
                    >
                      <option value="active">Active</option>
                      <option value="in_progress">In Progress</option>
                      <option value="answered">Answered</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{prayer.description}</p>
                <Badge variant="outline" className="mt-2">
                  {prayer.category}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}