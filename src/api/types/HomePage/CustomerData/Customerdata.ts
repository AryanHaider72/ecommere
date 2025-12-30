export interface CustomerDetailResponse {
  message: string;
  customerData: CustomerDetail[];
}

export interface CustomerDetail {
  customerID: string;
  customerName: string;
  email: string;
  phoneNo: string;
  isActive: boolean;
}
