import type { Borrower } from '@/types';
import { Badge } from '@/components/ui/badge';

interface BorrowerCardProps {
  borrower: Borrower;
  onSelect: (borrower: Borrower) => void;
  isSelected?: boolean;
}

export const BorrowerCard = ({ borrower, onSelect, isSelected }: BorrowerCardProps) => {
  const statusColors = {
    New: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    'In Review': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    Renew: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
    Approved: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' }
  };

  const statusConfig = statusColors[borrower.status as keyof typeof statusColors] || 
    { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };

  return (
    <div
      className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'ring-2 ring-blue-500 bg-blue-25 border-blue-300 shadow-md' 
          : `border-slate-200 hover:bg-slate-25 hover:border-slate-300 hover:shadow-sm ${statusConfig.bg}`
      }`}
      onClick={() => onSelect(borrower)}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-slate-900">{borrower.name}</h3>
          <p className="text-sm text-slate-600 mt-1">{borrower.loan_type}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-slate-900 text-lg">
            ${borrower.amount.toLocaleString()}
          </p>
          <Badge 
            variant="outline" 
            className={`mt-2 ${statusConfig.text} ${statusConfig.border}`}
          >
            {borrower.status}
          </Badge>
        </div>
      </div>
    </div>
  );
};