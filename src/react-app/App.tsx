import { useEffect, useState } from "react";
import { Prefecture, City, Weather } from "./types";

function App() {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    async function loadPrefectures() {
      const response = await fetch("/prefectures/");
      const data = await response.json();
      setPrefectures(data.prefectures);
    }

    loadPrefectures();
  }, []);

  const loadCities = async (prefectureId: number) => {
    const response = await fetch(`/prefectures/${prefectureId}/cities/`);
    const data = await response.json();
    setCities(data.cities);
  };

  const loadWeather = async (cityId: number) => {
    const response = await fetch(`/cities/${cityId}/weather/`);
    const data = await response.json();
    setWeather(data.weather);
  };

  return (
    <>
      <h1>天気予報</h1>

      <h2>都道府県</h2>
      <ul>
        {prefectures.map((prefecture) => (
          <li key={prefecture.id}>
            <a href="#" onClick={() => loadCities(prefecture.id)}>
              {prefecture.prefecture_name}
            </a>
          </li>
        ))}
      </ul>

      <h2>都市</h2>
      <ul>
        {cities.map((city) => (
          <li key={city.id}>
            <a href="#" onClick={() => loadWeather(city.id)}>
              {city.city_name}
            </a>
          </li>
        ))}
      </ul>

      {weather && (
        <div>
          <h2>{weather.title}</h2>
          <p>
            {weather.description.bodyText.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </p>
          <h3>予報</h3>
          <ul>
            {weather.forecasts.map((forecast) => (
              <div>
                <h4>
                  {forecast.dateLabel}({forecast.date})
                </h4>
                <p>{forecast.telop}</p>
                <p>{forecast.detail.weather}</p>
                <p>{forecast.temperature.min.celsius && `最低気温：${forecast.temperature.min.celsius}°C`}</p>
                <p>{forecast.temperature.max.celsius && `最高気温：${forecast.temperature.max.celsius}°C`}</p>
              </div>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default App;
