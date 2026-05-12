import ApiService from '../lib/apiClient';

export interface InvoiceData {
  rfc: string;
  name: string;
  zip: string;
  regimen: string;
  uso_cfdi: string;
}

export interface ContractParams {
  plan_id: string;
  billing_cycle: string;
  service_name: string;
  payment_method_id?: string;
  payment_intent_id?: string;
  create_subscription?: boolean;
  invoice?: InvoiceData;
  egg_id?: number;
}

export interface ContractResult {
  success: boolean;
  message: string;
  service?: {
    uuid: string;
    name: string;
    status: string;
  };
  invoice?: {
    uuid: string;
    invoice_number: string;
    total: number;
    currency: string;
  };
  // 402 — requires 3DS
  data?: {
    client_secret: string;
    requires_action: boolean;
  };
}

const contractService = {
  contract: (data: ContractParams) =>
    ApiService.post<ContractResult>('/services/contract', data),
};

export default contractService;
