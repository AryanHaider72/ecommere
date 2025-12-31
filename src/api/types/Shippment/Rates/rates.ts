export interface responseShippingRate {
  message: string;
  loopList: ShippingRate[];
}
export interface ShippingRate {
  storeZoneID: string;
  storeZoneName: string;
  destinationZoneID: string;
  destinationZoneName: string;
  price: number;
  minWeight: number;
  maxWeight: number;
}

export interface requestShippingRate {
  shippingDetail: ShippingZoneRate[];
}
export interface ShippingZoneRate {
  minWeight: number;
  maxWeight: number;
  StoreZoneID: string;
  DestinationZoneID: string;
  price: number;
}
