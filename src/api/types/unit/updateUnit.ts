export interface RequestUnitUpdateData {
  unitID: string;
  unitName: string;
  abbreviation: string;
  description: string;
}
export interface ResponseUnitUpdateData {
  status: string;
  message?: string;
}
