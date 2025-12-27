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
