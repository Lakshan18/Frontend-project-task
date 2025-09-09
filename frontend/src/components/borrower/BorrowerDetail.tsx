import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Borrower } from '@/types';
import { AlertTriangle, Phone, Mail, MessageSquare, Download, Send, CheckCircle, ArrowUp } from 'lucide-react';
import { apiService } from '@/api/apiService';

interface BorrowerDetailProps {
  borrower: Borrower;
}

export const BorrowerDetail = ({ borrower }: BorrowerDetailProps) => {
  const statusColors = {
    New: 'bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200',
    'In Review': 'bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200',
    Renew: 'bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200',
    Approved: 'bg-green-100 text-green-800 hover:bg-green-100 border-green-200'
  };

  const handleAction = async (action: string) => {
    try {
      let response;
      switch (action) {
        case 'requestDocuments':
          response = await apiService.requestDocuments(borrower.id);
          alert(response.message);
          break;
        case 'sendToValuer':
          response = await apiService.sendToValuer(borrower.id);
          alert(response.message);
          break;
        case 'approveLoan':
          response = await apiService.approveLoan(borrower.id);
          alert(response.message);
          break;
        case 'escalate':
          response = await apiService.escalateToCommittee(borrower.id);
          alert(response.message);
          break;
      }
    } catch (error) {
      console.error('Action failed:', error);
      alert('Action failed. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-6">
        <div className="flex flex-row justify-between items-start">
          <div className='flex flex-col justify-start'>
            <h2 className=" sm:text-[14px] font-bold text-slate-900">{borrower.name}</h2>
            <div className="flex flex-col justify-start mt-2 text-slate-600">
              <span className="flex items-center">
                <Mail className="h-4 w-4 mr-1 text-slate-400" />
                {borrower.email}
              </span>
              <span className="flex items-center">
                <Phone className="h-4 w-4 mr-1 text-slate-400" />
                {borrower.phone}
              </span>
            </div>
            <p className="text-xl font-bold text-blue-900 mt-3">
              ${borrower.loan_amount?.toLocaleString()}
            </p>
          </div>
          <Badge 
            variant="outline" 
            className={`px-3 py-1 text-sm font-medium ${statusColors[borrower.status as keyof typeof statusColors]}`}
          >
            {borrower.status}
          </Badge>
        </div>
      </div>

      <Accordion type="single" collapsible defaultValue="item-1" className="border border-slate-200 rounded-lg">
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger className="px-4 py-3 text-lg font-semibold bg-slate-50 rounded-t-lg hover:no-underline">
            <div className="flex items-center">
              <span>AI Explainability</span>
              {borrower.ai_flags && borrower.ai_flags.length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {borrower.ai_flags.length} Issues
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3">
              {borrower.ai_flags && borrower.ai_flags.length > 0 ? (
                borrower.ai_flags.map((flag, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-md">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-red-800 text-sm">{flag}</p>
                  </div>
                ))
              ) : (
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <p className="text-green-800 text-sm">No issues detected</p>
                </div>
              )}
              
              <div className="flex gap-2 mt-4 flex-wrap">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleAction('requestDocuments')}
                  className="flex items-center gap-1"
                >
                  <Download className="h-4 w-4" />
                  Request Documents
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleAction('sendToValuer')}
                  className="flex items-center gap-1"
                >
                  <Send className="h-4 w-4" />
                  Send to Valuer
                </Button>
                <Button 
                  size="sm"
                  onClick={() => handleAction('approveLoan')}
                  className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4" />
                  Approve
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
        <h3 className="text-lg font-semibold mb-4 text-slate-900">Loan Summary</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white p-3 rounded border border-slate-200">
            <p className="text-sm text-slate-500 mb-1">Employment</p>
            <p className="font-medium text-slate-900">{borrower.employment || 'N/A'}</p>
          </div>
          <div className="bg-white p-3 rounded border border-slate-200">
            <p className="text-sm text-slate-500 mb-1">Existing Loan</p>
            <p className="font-medium text-slate-900">${borrower.existing_loan?.toLocaleString() || '0'}</p>
          </div>
          <div className="bg-white p-3 rounded border border-slate-200">
            <p className="text-sm text-slate-500 mb-1">Credit Score</p>
            <p className="font-medium text-slate-900">{borrower.credit_score || 'N/A'}</p>
          </div>
          <div className="bg-white p-3 rounded border border-slate-200">
            <p className="text-sm text-slate-500 mb-1">Source of Funds</p>
            <p className="font-medium text-slate-900">{borrower.source_of_funds || 'N/A'}</p>
          </div>
        </div>

        {borrower.risk_signal && borrower.risk_signal !== 'None' && (
          <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-md mb-4">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-amber-800 font-medium">Risk Identified</p>
              <p className="text-amber-700 text-sm">{borrower.risk_signal}</p>
            </div>
          </div>
        )}

        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          onClick={() => handleAction('escalate')}
          disabled={!borrower.risk_signal || borrower.risk_signal === 'None'}
        >
          <ArrowUp className="h-4 w-4" />
          Escalate to Credit Committee
        </Button>
      </div>

      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
        <h3 className="text-lg font-semibold mb-3 text-slate-900">Contact Borrower</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Call
          </Button>
          <Button variant="outline" size="sm" className="flex-1 flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email
          </Button>
          <Button variant="outline" size="sm" className="flex-1 flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Message
          </Button>
        </div>
      </div>
    </div>
  );
};