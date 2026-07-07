import { create } from "zustand";
import axios from "axios";

type WeatherState = {
  weather: any;
  loading: boolean;
  error: string;

  getWeather: (
    city: string
  ) => Promise<void>;
};

const url =
  "https://api.openweathermap.org/data/2.5/weather";

const api_key =
  "f00c38e0279b7bc85480c3fe775d518c";

const useWeatherStore =
  create<WeatherState>((set) => ({
    weather: null,
    loading: false,
    error: "",

    getWeather: async (
      city: string
    ) => {
      try {
        set({
          loading: true,
          error: "",
        });

        const response =
          await axios.get(
            `${url}?q=${city}&appid=${api_key}&units=metric`
          );

        set({
          weather: response.data,
          loading: false,
        });
      } catch {
        set({
          error: "City Not Found",
          loading: false,
        });
      }
    },
  }));

export default useWeatherStore;