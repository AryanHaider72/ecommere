export interface RequestAddShippingZone {
  zoneID: string;
  cityList: cityList[];
}

export interface cityList {
  cityID: string;
  cityName: string;
}
export interface responseShippingZone {
  message: string;
  cityZoneList: ShippingZone[];
}
export interface ShippingZone {
  cityZoneID: string;
  zoneID: string;
  zoneName: string;
  cityZoneList: cityList[];
}
export interface cityList {
  cityID: string;
  cityName: string;
}
