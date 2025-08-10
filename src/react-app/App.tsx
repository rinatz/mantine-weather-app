import { useEffect, useState } from "react";

type Prefecture = {
  id: number;
  prefecture_name: string;
};

type City = {
  id: number;
  city_name: string;
};

type Weather = {
  title: string;
  description: string;
};

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
    setWeather({
      title: data.weather.title,
      description: data.weather.description.bodyText,
    });
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
          <p>{weather.description}</p>
        </div>
      )}
    </>
  );
}

export default App;
