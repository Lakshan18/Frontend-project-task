import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Phone, Mail, MessageSquare } from 'lucide-react';
import { useApiData } from '@/hooks/useApiData';
import { Skeleton } from '@/components/ui/skeleton';

export const BrokerOverview = () => {
  const { brokerData, workflowData } = useApiData();

  if (!brokerData || !workflowData) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-3/4" />
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
        <Skeleton className="h-6 w-full" />
        <div className="space-y-2">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">{brokerData.name}</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-slate-900">{brokerData.deals}</p>
              <p className="text-sm text-slate-600">Deals</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-slate-900">{brokerData.approval_rate}</p>
              <p className="text-sm text-slate-600">Approval Rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-slate-900">${brokerData.pending.toLocaleString()}</p>
              <p className="text-sm text-slate-600">Pending</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-2 mb-6">
          <Button variant="outline" size="sm" className="flex-1">
            <Phone className="h-4 w-4 mr-2" />
            Call
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <MessageSquare className="h-4 w-4 mr-2" />
            Chat
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Onboarding Workflow</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2">
            {workflowData.steps.map((step: string, index: number) => (
              <li key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 text-xs font-bold mt-0.5">
                  {index + 1}
                </div>
                <span className="text-sm text-slate-700">{step}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
        <span className="text-sm font-medium text-slate-900">E Ardsassist</span>
        <Toggle variant="outline" aria-label="Toggle AI assistant">
          <span className="text-sm">Enabled</span>
        </Toggle>
      </div>
    </div>
  );
};