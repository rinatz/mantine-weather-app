export type WeatherForecastResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number; // cSpell:enableCompoundWords
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: {
    time: string;
    weather_code: string;
    temperature_2m: string;
    apparent_temperature: string;
    precipitation_probability: string;
  };
  hourly: {
    time: string[];
    weather_code: number[];
    temperature_2m: number[];
    apparent_temperature: number[];
    precipitation_probability: number[];
  };
  daily_units: {
    time: string;
    weather_code: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    precipitation_probability_max: string;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
  };
};
