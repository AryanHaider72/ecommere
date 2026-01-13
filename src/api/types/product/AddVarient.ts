export interface addVarinetPayload {
  invoiceNo: string;
  supplierID: string;
  purchaseDate: string;
  totalBill: number;
  amountPaid: number;
  adjustments: number;
  totalStock: number;
  listVarient: Varient[];
}
export interface modifyVarinetPayload {
  invoiceNo: string;
  purchaseID: string;
  varientID: string;
  supplierID: string;
  purchaseDate: string;
  totalBill: number;
  amountPaid: number;
  adjustments: number;
  listVarient: Varient[];
}
export interface Varient {
  varientName: string;
  varientAttributes: VarientAttribute[];
}
export interface VarientAttribute {
  attributeID: string;
  varientValue: string;
  qty: number;
  costPrice: number;
  salePrice: number;
}
export interface ResponseModifyProductData {
  status: string;
  message?: string;
}
