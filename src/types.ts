export type WeatherByLocationResponse = {
  locationName: string;
  daily: {
    time: string;
    forecast: string;
    temperature: {
      min: number;
      max: number;
    };
  }[];
};
