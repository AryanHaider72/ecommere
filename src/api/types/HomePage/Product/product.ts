// types/product.ts

export interface ProductImage {
  urlID: string;
  url: string;
}

export interface VariantValue {
  attributeID: string;
  varientValue: string;
  amount: number;
  qty: number;
}

export interface ProductVariant {
  varientID: string;
  variantName: string;
  variantValues: VariantValue[];
}

export interface ProductHome {
  productID: string;
  categoryID: string;
  subCategoryID: string;
  subCategoryDetailID: string;
  storeSale: string;
  unitID: string;
  totalCount: number;

  productName: string;
  description: string;

  discount: number;
  currentStock: number;
  threshold: number;

  width: number;
  height: number;
  depth: number;
  weight: number;

  images: ProductImage[];
  variants: ProductVariant[];
}

export interface GetProductHomeApiResponse {
  message: string;
  productList: ProductHome[];
}
