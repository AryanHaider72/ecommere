export interface ledegrCustoemrAdd {
  postingDate: string;
  amount: number;
  customerID: string;
  remarks: string;
}
export interface ResponseCustomerLedgerGet {
  message: string;
  ledgerList: CustomerLedgerGet[];
}
export interface CustomerLedgerGet {
  ledgerID: string;
  EntryType: string;
  postingDate: string;
  debitAmount: number;
  creditAmount: number;
  remarks: string;
}
