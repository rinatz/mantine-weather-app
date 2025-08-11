import { useState } from "react";
import { WeatherByLocationResponse } from "../types";

function App() {
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
          <ul>
            {weather.daily.map((day) => (
              <li key={day.time}>
                {day.time}: {day.forecast} (最小: {day.temperature.min}°C, 最大:{" "}
                {day.temperature.max}°C)
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default App;
