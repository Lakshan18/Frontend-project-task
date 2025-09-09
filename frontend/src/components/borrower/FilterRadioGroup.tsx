import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface FilterRadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
}

const filterOptions = [
  { id: 'all', label: 'All Borrowers' },
  { id: 'active', label: 'Active Only' },
  { id: 'high-value', label: 'High Value (>$300K)' },
  { id: 'renewals', label: 'Renewals' }
];

export const FilterRadioGroup = ({ value, onValueChange }: FilterRadioGroupProps) => {
  return (
    <div className="mt-6 pt-4 border-t">
      <h4 className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-3">
        F-SANATISED ACTIVE
      </h4>
      
      <RadioGroup value={value} onValueChange={onValueChange} className="space-y-2">
        {filterOptions.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <RadioGroupItem value={option.id} id={option.id} />
            <Label htmlFor={option.id} className="text-sm font-normal cursor-pointer text-slate-700">
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};