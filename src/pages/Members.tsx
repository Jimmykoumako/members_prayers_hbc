import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Button } from "../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { MemberForm } from './MemberForm';

interface Member {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  role: 'admin' | 'manager' | 'member';
  attendance_status: 'active' | 'inactive' | 'visitor';
}

interface FormData {
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  role: Member['role'];
  attendance_status: Member['attendance_status'];
}

export default function Members() {
  const { user } = useAuth();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  useEffect(() => {
    checkRole();
    fetchMembers();
  }, [user]);

  const checkRole = async (): Promise<void> => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('members')
        .select('role')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      setIsAdmin(data?.role === 'admin');
    } catch (error) {
      console.error('Error checking role:', error);
    }
  };

  const fetchMembers = async (): Promise<void> => {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('first_name');
      
      if (error) throw error;
      setMembers(data || []);
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: FormData): Promise<void> => {
    try {
      if (selectedMember) {
        const { error } = await supabase
          .from('members')
          .update(formData)
          .eq('id', selectedMember.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('members')
          .insert([formData]);
        if (error) throw error;
      }
      await fetchMembers();
      setDialogOpen(false);
      setSelectedMember(null);
    } catch (error) {
      console.error('Error saving member:', error);
      throw error;
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-96">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Members</h1>
        <Button onClick={() => {
          setSelectedMember(null);
          setDialogOpen(true);
        }}>
          Add Member
        </Button>
      </div>

      <MemberForm
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        initialData={selectedMember}
        isEditing={!!selectedMember}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.first_name} {member.last_name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.phone}</TableCell>
                <TableCell>
                  <Badge variant={member.role === 'admin' ? 'destructive' : 'default'}>
                    {member.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={member.attendance_status === 'active' ? 'outline' : 'secondary'}>
                    {member.attendance_status}
                  </Badge>
                </TableCell>
                {isAdmin && (<TableCell className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSelectedMember(member);
                      setDialogOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}