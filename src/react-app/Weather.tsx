import { useState } from "react";
import { WeatherByLocationResponse } from "../types";

export function Weather() {
  const [weather, setWeather] = useState<WeatherByLocationResponse | null>(
    null
  );

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const cityName = formData.get("cityName");

    if (typeof cityName === "string") {
      const url = new URL("/weather", window.location.origin);
      url.searchParams.set("q", cityName);

      const response = await fetch(url.toString());

      setWeather(await response.json());
    }
  };

  return (
    <>
      <form onSubmit={submitForm}>
        <input type="text" name="cityName" placeholder="都市名を入力" />
        <button type="submit">検索</button>
      </form>
      {weather && (
        <div>
          <h3>{weather.locationName}</h3>
          <h1>{weather.hourly[0].temperature.current}°</h1>
          <p>{weather.hourly[0].forecast}</p>
          <p>
            ↑{weather.daily[0].temperature.max}°/↓
            {weather.daily[0].temperature.min}°
          </p>
          <p>体感温度{weather.hourly[0].temperature.apparent}°</p>
        </div>
      )}
    </>
  );
}
