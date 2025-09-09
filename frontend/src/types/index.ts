export interface Borrower {
  id: string;
  name: string;
  email: string;
  phone: string;
  loan_type: string;
  amount: number;
  loan_amount: number;
  status: string;
  employment?: string;
  income?: number;
  existing_loan?: number;
  credit_score?: number;
  source_of_funds?: string;
  risk_signal?: string;
  ai_flags?: string[];
}

export interface Broker {
  name: string;
  deals: number;
  approval_rate: string;
  pending: number;
}

export interface Pipeline {
  new: Borrower[];
  in_review: Borrower[];
  approved: Borrower[];
}

export interface OnboardingWorkflow {
  steps: string[];
}

export interface ApiResponse {
  success: boolean;
  message: string;
}

export interface ApiEndpoint {
  name: string;
  method: string;
  url: string;
  response: any;
}