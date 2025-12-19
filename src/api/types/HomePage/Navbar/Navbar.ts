export interface SubCategoryDetail {
  subCategoryDetailID: string;
  name: string;
}

export interface Category {
  subCategoryID: string;
  subCategoryName: string;
  subCategory: SubCategoryDetail[];
}

export interface NavbarApiResponse {
  message: string;
  categoryList: Category[];
}
