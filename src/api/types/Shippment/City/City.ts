export interface RequestAddCity {
  regionID: string;
  cityName: string;
}

export interface RequestModifyCity {
  regionID: string;
  cityID: string;
  cityName: string;
}

export interface responseCityList {
  message: string;
  citylist: citylist[];
}
export interface citylist {
  regionID: string;
  cityID: string;
  cityName: string;
  countryName: string;
  countryID: string;
  regionName: string;
}
