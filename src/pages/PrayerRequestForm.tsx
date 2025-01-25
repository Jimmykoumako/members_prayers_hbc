import React from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";

interface PrayerRequestFormData {
  title: string;
  description: string;
  category: string;
  is_permanent: boolean;
  status: string;
}

interface PrayerRequestFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: PrayerRequestFormData;
  onSubmit: (data: PrayerRequestFormData) => Promise<void>;
  isEditing?: boolean;
}

const defaultFormData: PrayerRequestFormData = {
  title: '',
  description: '',
  category: 'other',
  is_permanent: false,
  status: 'active'
};

const categories = [
  { value: 'health', label: 'Health' },
  { value: 'family', label: 'Family' },
  { value: 'spiritual', label: 'Spiritual' },
  { value: 'financial', label: 'Financial' },
  { value: 'other', label: 'Other' }
];

export function PrayerRequestForm({
  open,
  onOpenChange,
  initialData,
  onSubmit,
  isEditing = false
}: PrayerRequestFormProps) {
  const [formData, setFormData] = React.useState<PrayerRequestFormData>(
    initialData || defaultFormData
  );
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await onSubmit(formData);
      onOpenChange(false);
      setFormData(defaultFormData);
    } catch (error) {
      console.error('Error submitting prayer request:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Prayer Request' : 'Add Prayer Request'}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Update the details of your prayer request.'
              : 'Fill in the details for your new prayer request.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter a title for your prayer request"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your prayer request"
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_permanent"
              checked={formData.is_permanent}
              onCheckedChange={(checked) => 
                setFormData({ ...formData, is_permanent: checked as boolean })
              }
            />
            <Label htmlFor="is_permanent">
              Permanent Prayer Request
            </Label>
          </div>

          <div className="flex justify-end space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : isEditing ? 'Update' : 'Add Request'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}