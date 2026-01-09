export interface requestAddSaleReturn {
  saleID: string;
  customerID: string;
  postingDate: string;
  totalBill: number;
  amountPaid: number;
  adjustment: number;
  RetunrType: string;
  remarks: string;
  listExcahnge: listReturn[];
  listReturn: listReturn[];
}
export interface listReturn {
  attributeID: string;
  productName: string;
  barcode: string;
  qty: number;
  rate: number;
}
