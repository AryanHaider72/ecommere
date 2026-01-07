export interface requestAddSale {
  customerID: string;
  postingDate: string;
  totalBill: number;
  amountPaid: number;
  adjustment: number;
  remarks: string;
  list: ListItem[];
}
export interface ListItem {
  attributeID: string;
  qty: number;
  amount: number;
  remakrs: string;
}

export interface responseAddSale {
  message: string;
}
