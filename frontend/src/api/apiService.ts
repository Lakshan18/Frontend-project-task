import type { Borrower, Pipeline, Broker, OnboardingWorkflow, ApiResponse } from '@/types';

import sampleResponse from '../../../api/sample-response.json';

const apiData = sampleResponse as { endpoints: any[] };

const findEndpoint = (url: string, method: string = 'GET') => {
  return apiData.endpoints.find(
    endpoint => endpoint.url === url && endpoint.method === method
  );
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const createBorrowerContactInfo = (borrower: Borrower) => {
  const name = borrower.name.toLowerCase();
  
  switch(borrower.id) {
    case '1':
      return {
        email: 'sarah.dunn@200.com',
        phone: '(355)123-4557'
      };
    case '2':
      return {
        email: 'alan.matthews@678.com',
        phone: '(355)123-4558'
      };
    case '3': 
      return {
        email: 'lisa.carter@123.com', 
        phone: '(355)123-4559'
      };
    default:
      return {
        email: `${name.replace(' ', '.')}@example.com`,
        phone: `(555) ${100 + parseInt(borrower.id)}-${1000 + parseInt(borrower.id)}`
      };
  }
};

export const apiService = {
  getBorrowerPipeline: async (): Promise<Pipeline> => {
    await delay(300);
    const endpoint = findEndpoint('/api/borrowers/pipeline');
    return endpoint ? endpoint.response : { new: [], in_review: [], approved: [] };
  },

  getBorrowerDetail: async (id: string): Promise<Borrower | null> => {
    await delay(200);
    
    const pipelineEndpoint = findEndpoint('/api/borrowers/pipeline');
    if (!pipelineEndpoint) return null;
    
    const allBorrowers = [
      ...pipelineEndpoint.response.new,
      ...pipelineEndpoint.response.in_review,
      ...pipelineEndpoint.response.approved
    ];
    
    const borrowerFromPipeline = allBorrowers.find(b => b.id === id);
    if (!borrowerFromPipeline) return null;
    
    const detailEndpoint = findEndpoint('/api/borrowers/{id}');
    if (!detailEndpoint) return null;
    
    const contactInfo = createBorrowerContactInfo(borrowerFromPipeline);
    
    const borrowerDetail: Borrower = {
      ...borrowerFromPipeline,
      
      email: contactInfo.email,
      phone: contactInfo.phone,
      loan_amount: borrowerFromPipeline.amount, 
      
      employment: detailEndpoint.response.employment || '',
      income: detailEndpoint.response.income || 0,
      existing_loan: detailEndpoint.response.existing_loan || 0,
      credit_score: detailEndpoint.response.credit_score || 0,
      source_of_funds: detailEndpoint.response.source_of_funds || '',
      risk_signal: id === '1' 
        ? detailEndpoint.response.risk_signal 
        : 'No risk assessment available',
      ai_flags: id === '1' 
        ? detailEndpoint.response.ai_flags 
        : ['Data pending review']
    };
    
    return borrowerDetail;
  },

  getBrokerInfo: async (): Promise<Broker | null> => {
    await delay(150);
    const endpoint = findEndpoint('/api/broker/{id}');
    return endpoint ? endpoint.response : null;
  },

  getOnboardingWorkflow: async (): Promise<OnboardingWorkflow> => {
    await delay(100);
    const endpoint = findEndpoint('/api/onboarding/workflow');
    return endpoint ? endpoint.response : { steps: [] };
  },

  requestDocuments: async (id: string): Promise<ApiResponse> => {
    await delay(400);
    console.log('Requesting documents for borrower:', id);
    return { success: true, message: 'Documents requested successfully.' };
  },

  sendToValuer: async (id: string): Promise<ApiResponse> => {
    await delay(400);
    console.log('Sending to valuer for borrower:', id);
    return { success: true, message: 'Sent to valuer successfully.' };
  },

  approveLoan: async (id: string): Promise<ApiResponse> => {
    await delay(500);
    console.log('Approving loan for borrower:', id);
    return { success: true, message: 'Loan approved successfully.' };
  },

  escalateToCommittee: async (id: string): Promise<ApiResponse> => {
    await delay(450);
    console.log('Escalating to committee for borrower:', id);
    return { success: true, message: 'Escalated to Credit Committee.' };
  }
};