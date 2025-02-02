import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import * as XLSX from 'xlsx';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, Search, Menu } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';
import MemberForm from "@/pages/MemberForm";
import ExportDialog, { ExportField } from "@/components/ExportDialog";

interface Member {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  role: 'admin' | 'manager' | 'member';
  attendance_status: 'active' | 'inactive' | 'visitor';
  ministry?: string[];
  join_date?: string;
  created_at?: string;
}

interface FilterState {
  query: string;
  status: 'all' | 'active' | 'inactive' | 'visitor';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Form states
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [exportDialogOpen, setExportDialogOpen] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<FilterState['status']>('all');
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);

  const availableFields: ExportField[] = [
    { id: 'first_name', label: 'First Name', key: 'first_name' },
    { id: 'last_name', label: 'Last Name', key: 'last_name' },
    { id: 'email', label: 'Email', key: 'email' },
    { id: 'phone', label: 'Phone', key: 'phone' },
    { id: 'role', label: 'Role', key: 'role' },
    { id: 'attendance_status', label: 'Status', key: 'attendance_status' },
    { id: 'join_date', label: 'Join Date', key: 'join_date' },
    { id: 'ministry', label: 'Ministry', key: 'ministry' }
  ];

  useEffect(() => {
    const initializeComponent = async () => {
      setLoading(true);
      await Promise.all([checkRole(), fetchMembers()]);
      setLoading(false);
    };

    if (user) {
      initializeComponent();
    }
  }, [user]);

  useEffect(() => {
    if (members.length > 0) {
      filterMembers(searchQuery, selectedStatus);
    } else {
      setFilteredMembers([]);
    }
  }, [members, searchQuery, selectedStatus]);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value.trim());
  }, 300);

  const filterMembers = (query: string, status: string) => {
    let filtered = members;

    // Filter by status
    if (status !== 'all') {
      filtered = filtered.filter(member => member.attendance_status === status);
    }

    // Filter by search query
    if (query.trim()) {
      const searchTerm = query.toLowerCase().trim();
      filtered = filtered.filter(member => {
        return (
            member.first_name.toLowerCase().includes(searchTerm) ||
            member.last_name.toLowerCase().includes(searchTerm) ||
            (member.email?.toLowerCase().includes(searchTerm) ?? false) ||
            (member.phone?.toLowerCase().includes(searchTerm) ?? false) ||
            member.role.toLowerCase().includes(searchTerm)
        );
      });
    }

    setFilteredMembers(filtered);
  };

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
      toast.error('Error checking user role');
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
      toast.error('Error loading members');
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

        toast.success('Member updated successfully');
      } else {
        const { data, error } = await supabase
            .from('members')
            .insert([formData])
            .select()
            .single();

        if (error) throw error;
        setMembers(prev => [...prev, data as Member]);
        toast.success('Member added successfully');
      }

      setDialogOpen(false);
      setSelectedMember(null);
      fetchMembers();
    } catch (error: any) {
      console.error('Error saving member:', error);
      toast.error(error.message || 'Error saving member');
      throw error;
    }
  };

  const handleExport = (selectedFields: ExportField[], type: 'excel' | 'csv') => {
    try {
      // Prepare data for export
      const exportData = members.map(member => {
        const rowData: Record<string, any> = {};
        selectedFields.forEach(field => {
          rowData[field.label] = member[field.key as keyof Member] || '';
        });
        return rowData;
      });

      if (type === 'excel') {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(exportData);
        const colWidths = selectedFields.map(() => ({ wch: 15 }));
        ws['!cols'] = colWidths;
        XLSX.utils.book_append_sheet(wb, ws, 'Members');
        const date = new Date().toISOString().split('T')[0];
        XLSX.writeFile(wb, `church_members_${date}.xlsx`);
      } else {
        const ws = XLSX.utils.json_to_sheet(exportData);
        const csv = XLSX.utils.sheet_to_csv(ws);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const date = new Date().toISOString().split('T')[0];
        link.href = URL.createObjectURL(blob);
        link.download = `church_members_${date}.csv`;
        link.click();
      }

      toast.success('Members list exported successfully');
    } catch (error) {
      console.error('Error exporting members:', error);
      toast.error('Error exporting members list');
    }
  };

  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2">Loading...</p>
          </div>
        </div>
    );
  }

  return (
      <div className="space-y-4 p-4 md:p-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center">
          <h1 className="text-2xl font-semibold">Members</h1>

          {/* Mobile Menu Button */}
          <Button
              variant="ghost"
              className="md:hidden self-end"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Controls Section */}
        <div className={`flex flex-col space-y-4 ${mobileMenuOpen ? '' : 'hidden md:flex'}`}>
          {/* Search Bar */}
          <div className="w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                  placeholder="Search members..."
                  onChange={(e) => debouncedSearch(e.target.value)}
                  className="pl-10 w-full"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
            <Button
                variant={selectedStatus === 'all' ? 'default' : 'outline'}
                size="sm"
                className="w-full sm:w-auto"
                onClick={() => setSelectedStatus('all')}
            >
              All
            </Button>
            <Button
                variant={selectedStatus === 'active' ? 'default' : 'outline'}
                size="sm"
                className="w-full sm:w-auto"
                onClick={() => setSelectedStatus('active')}
            >
              Active
            </Button>
            <Button
                variant={selectedStatus === 'inactive' ? 'default' : 'outline'}
                size="sm"
                className="w-full sm:w-auto"
                onClick={() => setSelectedStatus('inactive')}
            >
              Inactive
            </Button>
            <Button
                variant={selectedStatus === 'visitor' ? 'default' : 'outline'}
                size="sm"
                className="w-full sm:w-auto"
                onClick={() => setSelectedStatus('visitor')}
            >
              Visitor
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
                variant="outline"
                onClick={() => setExportDialogOpen(true)}
                className="w-full sm:w-auto"
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button
                onClick={() => {
                  setSelectedMember(null);
                  setDialogOpen(true);
                }}
                className="w-full sm:w-auto"
            >
              Add Member
            </Button>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto rounded-md border bg-white">
          <div className="min-w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">Name</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden sm:table-cell">Phone</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  {isAdmin && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.length === 0 ? (
                    <TableRow>
                      <TableCell
                          colSpan={isAdmin ? 6 : 5}
                          className="text-center py-8 text-gray-500"
                      >
                        No members found
                      </TableCell>
                    </TableRow>
                ) : (
                    filteredMembers.map((member) => (
                        <TableRow key={member.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium">
                            <div>
                              {member.first_name} {member.last_name}
                              {/* Mobile-only contact info */}
                              <div className="md:hidden text-sm text-gray-500 mt-1">
                                {member.email && <div>{member.email}</div>}
                                {member.phone && <div>{member.phone}</div>}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {member.email}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {member.phone}
                          </TableCell>
                          <TableCell>
                            <Badge
                                variant={
                                  member.role === 'admin'
                                      ? 'destructive'
                                      : member.role === 'manager'
                                          ? 'default'
                                          : 'secondary'
                                }
                                className="whitespace-nowrap"
                            >
                              {member.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                                variant={
                                  member.attendance_status === 'active'
                                      ? 'outline'
                                      : member.attendance_status === 'inactive'
                                          ? 'secondary'
                                          : 'default'
                                }
                                className="whitespace-nowrap"
                            >
                              {member.attendance_status}
                            </Badge>
                          </TableCell>
                          {isAdmin && (
                              <TableCell className="text-right">
                                <Button
                                    variant="ghost"
                                    onClick={() => {
                                      setSelectedMember(member);
                                      setDialogOpen(true);
                                    }}
                                    className="hover:bg-gray-100"
                                >
                                  Edit
                                </Button>
                              </TableCell>
                          )}
                        </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Export Dialog */}
        <ExportDialog
            open={exportDialogOpen}
            onOpenChange={setExportDialogOpen}
            onExport={handleExport}
            availableFields={availableFields}
        />

        {/* Member Form Dialog */}
        <MemberForm
            open={dialogOpen}
            onOpenChange={(open) => {
              setDialogOpen(open);
              if (!open) {
                setSelectedMember(null);
              }
            }}
            onSuccess={handleSubmit}
            initialData={selectedMember}
            isEditing={!!selectedMember}
        />
      </div>
  );
}