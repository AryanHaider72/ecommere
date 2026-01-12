export interface SubCategoryDetail {
  subCategoryDetailID: string;
  name: string;
}

export interface Category {
  subCategoryID: string;
  subCategoryName: string;
  subCategory: SubCategoryDetail[];
  imageList: imageListCategory[];
}

export interface NavbarApiResponse {
  message: string;
  categoryList: Category[];
}
export interface imageListCategory {
  url: string;
}
