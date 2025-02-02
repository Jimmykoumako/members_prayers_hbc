import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export interface ExportField {
    id: string;
    label: string;
    key: string;
}

interface ExportDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onExport: (fields: ExportField[], type: 'excel' | 'csv') => void;
    availableFields: ExportField[];
}

export default function ExportDialog({
                                         open,
                                         onOpenChange,
                                         onExport,
                                         availableFields
                                     }: ExportDialogProps) {
    const [selectedFields, setSelectedFields] = useState<string[]>(
        availableFields.map(field => field.id)
    );

    const handleFieldToggle = (fieldId: string) => {
        setSelectedFields(current =>
            current.includes(fieldId)
                ? current.filter(id => id !== fieldId)
                : [...current, fieldId]
        );
    };

    const handleSelectAll = () => {
        setSelectedFields(availableFields.map(field => field.id));
    };

    const handleDeselectAll = () => {
        setSelectedFields([]);
    };

    const handleExport = (type: 'excel' | 'csv') => {
        const fields = availableFields.filter(field =>
            selectedFields.includes(field.id)
        );
        onExport(fields, type);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-white border shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <DialogHeader className="bg-white">
                    <DialogTitle className="text-xl font-semibold">Export Members</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4 bg-white">
                    <div className="flex justify-between mb-4">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleSelectAll}
                        >
                            Select All
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleDeselectAll}
                        >
                            Deselect All
                        </Button>
                    </div>

                    <div className="space-y-4 bg-white">
                        {availableFields.map((field) => (
                            <div key={field.id} className="flex items-center space-x-2 bg-white">
                                <Checkbox
                                    id={field.id}
                                    checked={selectedFields.includes(field.id)}
                                    onCheckedChange={() => handleFieldToggle(field.id)}
                                />
                                <Label htmlFor={field.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    {field.label}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end space-x-2 mt-4 bg-white">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={() => handleExport('excel')}
                        disabled={selectedFields.length === 0}
                    >
                        Export Excel
                    </Button>
                    <Button
                        type="button"
                        onClick={() => handleExport('csv')}
                        disabled={selectedFields.length === 0}
                    >
                        Export CSV
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}