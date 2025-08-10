export type PrefecturesResponse = {
  prefectures: Prefecture[];
};

export type Prefecture = {
  id: number;
  prefecture_name: string;
};

export type CityResponse = {
  cities: City[];
};

export type City = {
  id: number;
  city_name: string;
};

export type WeatherResponse = {
  weather: Weather;
};

export type Weather = {
  publicTime: string;
  publicTimeFormatted: string;
  publishingOffice: string;
  title: string;
  link: string;
  description: WeatherDescription;
  forecasts: Forecast[];
  location: Location;
  copyright: Copyright;
};

export type WeatherDescription = {
  publicTime: string;
  publicTimeFormatted: string;
  headlineText: string;
  bodyText: string;
  text: string;
};

export type Forecast = {
  date: string;
  dateLabel: string;
  telop: string;
  detail: ForecastDetail;
  temperature: ForecastTemperature;
  chanceOfRain: ChanceOfRain;
  image: ForecastImage;
};

export type ForecastDetail = {
  weather: string;
  wind: string;
  wave: string;
};

export type ForecastTemperature = {
  min: TemperatureValue;
  max: TemperatureValue;
};

export type TemperatureValue = {
  celsius: string | null;
  fahrenheit: string | null;
};

export type ChanceOfRain = {
  T00_06: string;
  T06_12: string;
  T12_18: string;
  T18_24: string;
};

export type ForecastImage = {
  title: string;
  url: string;
  width: number;
  height: number;
};

export type Location = {
  area: string;
  prefecture: string;
  district: string;
  city: string;
};

export type Copyright = {
  title: string;
  link: string;
  image: CopyrightImage;
  provider: CopyrightProvider[];
};

export type CopyrightImage = {
  title: string;
  link: string;
  url: string;
  width: number;
  height: number;
};

export type CopyrightProvider = {
  link: string;
  name: string;
  note: string;
};
