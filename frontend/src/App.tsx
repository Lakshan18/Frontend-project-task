import { BorrowerPipeline } from './components/borrower/BorrowerPipeline';
import { BorrowerDetail } from './components/borrower/BorrowerDetail';
import { BrokerOverview } from './components/broker/BrokerOverview';
import { useAppStore } from './store/useAppStore';
import { Search, HelpCircle, Bell, User } from 'lucide-react';
import { useApiData } from './hooks/useApiData';
import { Skeleton } from './components/ui/skeleton';

function App() {
  const { activeBorrower, isLoading } = useAppStore();
  useApiData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white shadow-sm border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-900">DemoApp</h1>
        </div>
        <div className="flex space-x-3">
          <button className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600 hover:text-slate-900">
            <Search className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600 hover:text-slate-900">
            <HelpCircle className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600 hover:text-slate-900 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </header>

      <main className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <BorrowerPipeline />
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-32 w-full mt-4" />
            </div>
          ) : activeBorrower ? (
            <BorrowerDetail borrower={activeBorrower} />
          ) : (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <User className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-700 mb-2">Select a Borrower</h3>
              <p className="text-slate-500">Choose a borrower from the list to view details</p>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <BrokerOverview />
        </div>
      </main>
    </div>
  );
}

export default App;