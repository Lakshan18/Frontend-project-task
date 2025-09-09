import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppStore } from '@/store/useAppStore';
import { apiService } from '@/api/apiService';
import { BorrowerCard } from './BorrowerCard';
import type { Borrower } from '@/types';
import { useApiData } from '@/hooks/useApiData';
import { Skeleton } from '@/components/ui/skeleton';

export const BorrowerPipeline = () => {
  const { activeTab, setActiveTab, activeBorrower, setActiveBorrower } = useAppStore();
  const { pipelineData } = useApiData();

  const handleBorrowerSelect = async (borrower: Borrower) => {
    const borrowerDetail = await apiService.getBorrowerDetail(borrower.id);
    if (borrowerDetail) {
      setActiveBorrower(borrowerDetail);
    }
  };

  if (!pipelineData) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="new">New ({pipelineData.new.length})</TabsTrigger>
          <TabsTrigger value="in_review">In Review ({pipelineData.in_review.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({pipelineData.approved.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="new" className="space-y-3">
          {pipelineData.new.map((borrower: Borrower) => (
            <BorrowerCard 
              key={borrower.id} 
              borrower={borrower} 
              onSelect={handleBorrowerSelect}
              isSelected={activeBorrower?.id === borrower.id}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="in_review" className="space-y-3">
          {pipelineData.in_review.map((borrower: Borrower) => (
            <BorrowerCard 
              key={borrower.id} 
              borrower={borrower} 
              onSelect={handleBorrowerSelect}
              isSelected={activeBorrower?.id === borrower.id}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="approved" className="space-y-3">
          {pipelineData.approved.map((borrower: Borrower) => (
            <BorrowerCard 
              key={borrower.id} 
              borrower={borrower} 
              onSelect={handleBorrowerSelect}
              isSelected={activeBorrower?.id === borrower.id}
            />
          ))}
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 pt-4 border-t">
        <h4 className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">
          F-SANATISED ACTIVE
        </h4>
        <div className="text-sm text-slate-600 p-2 bg-slate-50 rounded border border-slate-200">
          No active filters applied
        </div>
      </div>
    </div>
  );
};