export interface cartList {
  cartlist: CartData[];
}
export interface CartData {
  productID: string;
  productName: string;
  description: string;
  salePrice: number;
  quantity: number;
  image?: string;
  discount: number;
}
export interface CartData2 {
  productID: string;
  qty: number;
}
