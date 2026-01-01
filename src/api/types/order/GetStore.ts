export interface SellerStoreListResponse {
  message: string;
  storesList: storesListSeller[];
}
export interface storesListSeller {
  customerName: string;
  discount: number;
  email: string;
  orderDate: string;
  orderDetailID: string;
  paymentID: string;
  paymentName: string;
  phoneNo: string;
  productID: string;
  productName: string;
  qty: number;
  totalAmount: number;
  salePrice: number;
  shippingAddress: string;
  shippingCharges: number;
  status: string;
}
