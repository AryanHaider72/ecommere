// Main API response interface
export interface VarinetApiResponse {
  message: string;
  vareintList: VariantList[];
}

// Variant sub-type
export type VariantList = {
  varientID: string;
  variantName: string;
  varientAttributes: VariantValue[];
};

// Variant value sub-type
export type VariantValue = {
  attributeID: string;
  varientValue: string;
  amount: number;
  qty: number;
};
