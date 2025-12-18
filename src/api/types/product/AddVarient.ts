export interface addVarinetPayload {
  listVarient: Varient[];
}

export interface Varient {
  varientName: string;
  varientAttributes: VarientAttribute[];
}
export interface VarientAttribute {
  varientValue: string;
  qty: number;
  amount: number;
}
export interface ResponseModifyProductData {
  status: string;
  message?: string;
}
