// cSpell:ignore Meteo nominatim

import { fetchLocation } from "../external/nominatim";
import { fetchWeatherForecast } from "../external/openMeteo";
import { WeatherByLocationResponse } from "../../types";
import { parseISO } from "date-fns";
import { TZDate } from "@date-fns/tz";

export async function getWeatherByLocation(
  locationName: string
): Promise<WeatherByLocationResponse> {
  const geo = await fetchLocation(locationName);
  const { name, lat, lon } = geo[0];

  const weatherForecast = await fetchWeatherForecast({
    latitude: parseFloat(lat),
    longitude: parseFloat(lon),
  });

  const now = new TZDate(new Date(), weatherForecast.timezone);

  return {
    locationName: name,
    hourly: weatherForecast.hourly.time
      .filter((time) => {
        const dateTimeISO = new TZDate(
          parseISO(time),
          weatherForecast.timezone
        );

        return dateTimeISO >= now;
      })
      .map((time, index) => {
        const dateTimeISO = new TZDate(
          parseISO(time),
          weatherForecast.timezone
        );

        return {
          time: dateTimeISO.toISOString(),
          weatherCode: weatherForecast.hourly.weather_code[index],
          temperature: {
            current: Math.round(weatherForecast.hourly.temperature_2m[index]),
            apparent: Math.round(
              weatherForecast.hourly.apparent_temperature[index]
            ),
          },
          precipitationProbability: Math.round(
            weatherForecast.hourly.precipitation_probability[index]
          ),
        };
      }),
    daily: weatherForecast.daily.time
      .filter((time) => {
        const dateTimeISO = new TZDate(
          parseISO(time),
          weatherForecast.timezone
        );

        return dateTimeISO >= now;
      })
      .map((time, index) => {
        const dateTimeISO = new TZDate(
          parseISO(time),
          weatherForecast.timezone
        );

        return {
          time: dateTimeISO.toISOString(),
          weatherCode: weatherForecast.daily.weather_code[index],
          temperature: {
            max: Math.round(weatherForecast.daily.temperature_2m_max[index]),
            min: Math.round(weatherForecast.daily.temperature_2m_min[index]),
          },
          precipitationProbability: Math.round(
            weatherForecast.daily.precipitation_probability_max[index]
          ),
        };
      }),
  };
}
