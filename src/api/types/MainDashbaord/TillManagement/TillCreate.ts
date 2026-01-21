export interface AddTill {
  tillName: string;
  listProduct: listProduct[];
}
export interface ModifyTill {
  TillID: string;
  tillName: string;
  listProduct: listProduct[];
}
export interface listProduct {
  productID: string;
}

export interface AddLoign {
  userName: string;
  email: string;
  password: string;
  tillID: string;
}
