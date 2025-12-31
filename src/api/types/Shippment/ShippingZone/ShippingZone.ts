export interface RequestAddShippingZone {
  zoneID: string;
  cityID: string;
}

export interface responseShippingZone {
  message: string;
  cityZoneList: ShippingZone[];
}
export interface ShippingZone {
  cityZoneID: string;
  cityID: string;
  cityName: string;
}
