// cSpell:ignore Meteo nominatim

import { fetchLocation } from "../external/nominatim";
import { fetchWeatherForecast } from "../external/openMeteo";
import { WeatherByLocationResponse } from "../../types";

function getWeatherCodeString(weatherCode: number): string {
  const weatherCodeString: Record<number, string> = {
    0: "快晴",
    1: "ほぼ晴れ",
    2: "薄曇り",
    3: "曇り",
    45: "霧",
    48: "樹氷を伴う霧",
    51: "霧雨（弱い）",
    53: "霧雨（やや強い）",
    55: "霧雨（強い）",
    56: "着氷性の霧雨（弱い）",
    57: "着氷性の霧雨（強い）",
    61: "雨（弱い）",
    63: "雨（やや強い）",
    65: "雨（強い）",
    66: "着氷性の雨（弱い）",
    67: "着氷性の雨（強い）",
    71: "降雪（弱い）",
    73: "降雪（やや強い）",
    75: "降雪（強い）",
    77: "雪あられ",
    80: "にわか雨（弱い）",
    81: "にわか雨（やや強い）",
    82: "にわか雨（非常に強い）",
    85: "にわか雪（弱い）",
    86: "にわか雪（強い）",
    95: "雷雨（弱い〜中程度）",
    96: "ひょうを伴う雷雨（弱い）",
    99: "ひょうを伴う雷雨（強い）",
  };

  return weatherCodeString[weatherCode] || "不明";
}

export async function getWeatherByLocation(
  locationName: string
): Promise<WeatherByLocationResponse> {
  const geo = await fetchLocation(locationName);
  const { name, lat, lon } = geo[0];

  const weatherForecast = await fetchWeatherForecast({
    latitude: parseFloat(lat),
    longitude: parseFloat(lon),
  });

  return {
    locationName: name,
    hourly: weatherForecast.hourly.time.map((time, index) => {
      return {
        time,
        weatherCode: weatherForecast.hourly.weather_code[index],
        forecast: getWeatherCodeString(
          weatherForecast.hourly.weather_code[index]
        ),
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
    daily: weatherForecast.daily.time.map((time, index) => {
      return {
        time,
        weatherCode: weatherForecast.daily.weather_code[index],
        forecast: getWeatherCodeString(
          weatherForecast.daily.weather_code[index]
        ),
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
