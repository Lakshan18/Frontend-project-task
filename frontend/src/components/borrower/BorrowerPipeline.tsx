import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppStore } from '@/store/useAppStore';
import { apiService } from '@/api/apiService';
import { BorrowerCard } from './BorrowerCard';
import { FilterRadioGroup } from './FilterRadioGroup';
import type { Borrower } from '@/types';
import { useApiData } from '@/hooks/useApiData';
import { Skeleton } from '@/components/ui/skeleton';

export const BorrowerPipeline = () => {
  const { 
    activeTab, 
    setActiveTab, 
    activeBorrower, 
    setActiveBorrower,
    filterValue,
    setFilterValue 
  } = useAppStore();
  
  const { pipelineData } = useApiData();

  const handleBorrowerSelect = async (borrower: Borrower) => {
    const borrowerDetail = await apiService.getBorrowerDetail(borrower.id);
    if (borrowerDetail) {
      setActiveBorrower(borrowerDetail);
    }
  };

  const filterBorrowers = (borrowers: Borrower[]) => {
    switch (filterValue) {
      case 'active':
        return borrowers.filter(b => b.status !== 'New');
      case 'high-value':
        return borrowers.filter(b => b.amount > 300000);
      case 'renewals':
        return borrowers.filter(b => b.status === 'Renew');
      default:
        return borrowers;
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
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 xs:grid-cols-1 h-full mb-4">
          <TabsTrigger value="new">New ({pipelineData.new.length})</TabsTrigger>
          <TabsTrigger value="in_review">In Review ({pipelineData.in_review.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({pipelineData.approved.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="new" className="space-y-3">
          {filterBorrowers(pipelineData.new).length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <p>No borrowers match the current filter</p>
            </div>
          ) : (
            filterBorrowers(pipelineData.new).map((borrower: Borrower) => (
              <BorrowerCard 
                key={borrower.id} 
                borrower={borrower} 
                onSelect={handleBorrowerSelect}
                isSelected={activeBorrower?.id === borrower.id}
              />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="in_review" className="space-y-3">
          {filterBorrowers(pipelineData.in_review).length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <p>No borrowers match the current filter</p>
            </div>
          ) : (
            filterBorrowers(pipelineData.in_review).map((borrower: Borrower) => (
              <BorrowerCard 
                key={borrower.id} 
                borrower={borrower} 
                onSelect={handleBorrowerSelect}
                isSelected={activeBorrower?.id === borrower.id}
              />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="approved" className="space-y-3">
          {filterBorrowers(pipelineData.approved).length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <p>No borrowers match the current filter</p>
            </div>
          ) : (
            filterBorrowers(pipelineData.approved).map((borrower: Borrower) => (
              <BorrowerCard 
                key={borrower.id} 
                borrower={borrower} 
                onSelect={handleBorrowerSelect}
                isSelected={activeBorrower?.id === borrower.id}
              />
            ))
          )}
        </TabsContent>
      </Tabs>
      
      <FilterRadioGroup value={filterValue} onValueChange={setFilterValue} />
    </div>
  );
};