import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from '@/lib/supabase';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

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


interface MemberData {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string | null;
  birthday: string | null;
  join_date: string | null;
  role: 'admin' | 'manager' | 'member';
  ministry: string[];
  family_members: string[] | null;
  emergency_contact: EmergencyContact | null;
  attendance_status: 'active' | 'inactive' | 'visitor';
  baptism_date: string | null;
  notes: string | null;
}

interface MemberFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (formData: FormData) => (formData: FormData) => Promise<void>;
  initialData?: Partial<MemberData>;
  isEditing?: boolean;
}

const defaultFormData: MemberData = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  address: null,
  birthday: null,
  join_date: new Date().toISOString().split('T')[0],
  role: 'member',
  ministry: [],
  family_members: null,
  emergency_contact: null,
  attendance_status: 'active',
  baptism_date: null,
  notes: null
};

export default function MemberForm({
                                     open,
                                     onOpenChange,
                                     onSuccess,
                                     initialData,
                                     isEditing = false
                                   }: MemberFormProps) {
  const [formData, setFormData] = useState<MemberData>(defaultFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showMoreFields, setShowMoreFields] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...defaultFormData,
        ...initialData,
        email: initialData.email || '',
        phone: initialData.phone || '',
        // Ensure dates are in the correct format
        birthday: initialData.birthday ? new Date(initialData.birthday).toISOString().split('T')[0] : null,
        join_date: initialData.join_date ? new Date(initialData.join_date).toISOString().split('T')[0] : null,
        baptism_date: initialData.baptism_date ? new Date(initialData.baptism_date).toISOString().split('T')[0] : null,
      });
    } else {
      setFormData(defaultFormData);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const cleanFormData = {
        ...formData,
        email: formData.email.trim() || null,
        phone: formData.phone.trim() || null,
        // Clean optional fields
        address: formData.address?.trim() || null,
        birthday: formData.birthday || null,
        join_date: formData.join_date || null,
        baptism_date: formData.baptism_date || null,
        notes: formData.notes?.trim() || null,
        // Ensure arrays are properly handled
        ministry: Array.isArray(formData.ministry) ? formData.ministry : [],
        family_members: Array.isArray(formData.family_members) ? formData.family_members : null,
      };

      if (!isEditing) {
        const { error: insertError } = await supabase
            .from('members')
            .insert([cleanFormData]);

        if (insertError) throw insertError;
      } else {
        const { error: updateError } = await supabase
            .from('members')
            .update(cleanFormData)
            .eq('id', initialData?.id);

        if (updateError) throw updateError;
      }

      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error('Error:', error);
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-white border shadow-lg w-[95%] max-w-2xl mx-auto p-4 sm:p-6 rounded-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-semibold">
              {isEditing ? 'Edit Member' : 'Add New Member'}
            </DialogTitle>
          </DialogHeader>

          {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Required Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name *</Label>
                <Input
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name *</Label>
                <Input
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    required
                />
              </div>
            </div>

            {/* Basic Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            {/* Role and Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Select
                    value={formData.role}
                    onValueChange={(value: MemberData['role']) =>
                        setFormData({ ...formData, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="attendance_status">Status *</Label>
                <Select
                    value={formData.attendance_status}
                    onValueChange={(value: MemberData['attendance_status']) =>
                        setFormData({ ...formData, attendance_status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="visitor">Visitor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Additional Information Accordion */}
            <Accordion type="single" collapsible>
              <AccordionItem value="additional-info">
                <AccordionTrigger>Additional Information</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    {/* Address */}
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                          id="address"
                          value={formData.address || ''}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="birthday">Birthday</Label>
                        <Input
                            id="birthday"
                            type="date"
                            value={formData.birthday || ''}
                            onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="join_date">Join Date</Label>
                        <Input
                            id="join_date"
                            type="date"
                            value={formData.join_date || ''}
                            onChange={(e) => setFormData({ ...formData, join_date: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="baptism_date">Baptism Date</Label>
                        <Input
                            id="baptism_date"
                            type="date"
                            value={formData.baptism_date || ''}
                            onChange={(e) => setFormData({ ...formData, baptism_date: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Emergency Contact */}
                    <div className="space-y-4 border rounded-md p-4">
                      <h4 className="font-medium">Emergency Contact</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="emergency_name">Name</Label>
                          <Input
                              id="emergency_name"
                              value={formData.emergency_contact?.name || ''}
                              onChange={(e) => setFormData({
                                ...formData,
                                emergency_contact: {
                                  ...formData.emergency_contact,
                                  name: e.target.value
                                } as EmergencyContact
                              })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergency_phone">Phone</Label>
                          <Input
                              id="emergency_phone"
                              type="tel"
                              value={formData.emergency_contact?.phone || ''}
                              onChange={(e) => setFormData({
                                ...formData,
                                emergency_contact: {
                                  ...formData.emergency_contact,
                                  phone: e.target.value
                                } as EmergencyContact
                              })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergency_relationship">Relationship</Label>
                          <Input
                              id="emergency_relationship"
                              value={formData.emergency_contact?.relationship || ''}
                              onChange={(e) => setFormData({
                                ...formData,
                                emergency_contact: {
                                  ...formData.emergency_contact,
                                  relationship: e.target.value
                                } as EmergencyContact
                              })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                          id="notes"
                          value={formData.notes || ''}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          className="min-h-[100px]"
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Form Actions */}
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : isEditing ? 'Update Member' : 'Add Member'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
  );
}