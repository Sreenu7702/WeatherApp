import { useState } from "react";
import "./App.css";
import useWeatherStore from "./store/webstore";

function App() {
  const [city, setCity] = useState("");

  const {
    weather,
    loading,
    error,
    getWeather,
  } = useWeatherStore();

  return (
    <div className="app">
      <div className="weather-card">
        <h1>Weather App</h1>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) =>
              setCity(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getWeather(city);
              }
            }}
          />

          <button
            onClick={() =>
              getWeather(city)
            }
          >
            Search
          </button>
        </div>

        {loading && (
          <h2 className="loading">
            Loading...
          </h2>
        )}

        {error && (
          <h3 className="error">
            {error}
          </h3>
        )}

        {weather && (
          <div className="weather-info">
            <h2>{weather.name}</h2>

            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
            />

            <h3>
              {weather.main.temp}°C
            </h3>

            <p>
              {
                weather.weather[0]
                  .description
              }
            </p>

            <p>
              Humidity:
              {
                weather.main
                  .humidity
              }
              %
            </p>

            <p>
              Wind Speed:
              {
                weather.wind.speed
              }
              m/s
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;