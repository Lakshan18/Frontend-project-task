import type { Borrower, Pipeline, Broker, OnboardingWorkflow, ApiResponse } from '@/types';

import sampleResponse from '../../../api/sample-response.json';

const apiData = sampleResponse as { endpoints: any[] };

const findEndpoint = (url: string, method: string = 'GET') => {
  return apiData.endpoints.find(
    endpoint => endpoint.url === url && endpoint.method === method
  );
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const createBorrowerDatabase = () => {
  const pipelineEndpoint = findEndpoint('/api/borrowers/pipeline');
  const detailEndpoint = findEndpoint('/api/borrowers/{id}');
  
  if (!pipelineEndpoint || !detailEndpoint) return {};
  
  const allBorrowers: Borrower[] = [
    ...pipelineEndpoint.response.new,
    ...pipelineEndpoint.response.in_review,
    ...pipelineEndpoint.response.approved
  ];
  
  const borrowerDatabase: Record<string, Borrower> = {};
  
  allBorrowers.forEach(borrower => {
    borrowerDatabase[borrower.id] = {
      ...detailEndpoint.response, 
      ...borrower,              
      email: `${borrower.name.toLowerCase().replace(' ', '.')}@example.com`,
      phone: `(555) ${100 + parseInt(borrower.id)}-${1000 + parseInt(borrower.id)}`
    };
  });
  
  return borrowerDatabase;
};

const borrowerDatabase = createBorrowerDatabase();

export const apiService = {
  getBorrowerPipeline: async (): Promise<Pipeline> => {
    await delay(300);
    const endpoint = findEndpoint('/api/borrowers/pipeline');
    return endpoint ? endpoint.response : { new: [], in_review: [], approved: [] };
  },

  getBorrowerDetail: async (id: string): Promise<Borrower | null> => {
    await delay(200);
    return borrowerDatabase[id] || null;
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