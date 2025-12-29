export interface CustomerDetailResponse {
  message: string;
  customerData: CustomerDetail[];
}

export interface CustomerDetail {
  userName: string;
  email: string;
  phoneNo: string;
  isActive: boolean;
}
