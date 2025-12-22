// Main API response interface
export interface ProductApiResponse {
  message: string;
  list: Product[];
}

// A single product record
export type Product = {
  productID: string;
  storeSale: string;
  categoryID: string;
  subCategoryID: string;
  subCategoryDetailID: string;
  unitID: string;
  productName: string;
  description: string;
  feturedProduct: boolean;
  discount: number;
  currentStock: number;
  threshold: number;
  width: number;
  height: number;
  depth: number;
  weight: number;
  showinAllCountry: boolean;
  showinCountry: boolean;
  notShowinCountry: boolean;
  countryList: countryList[];
  images: Image[];
  variants: Variant[];
};

// Image sub-type
export type Image = {
  urlID: string;
  url: string;
};

// Variant sub-type
export type Variant = {
  varientID: string;
  variantName: string;
  variantValues: VariantValue[];
};

// Variant value sub-type
export type VariantValue = {
  attributeID: string;
  varientValue: string;
  amount: number;
  qty: number;
};
export type countryList = {
  countryID: string;
  countryName: string;
};
