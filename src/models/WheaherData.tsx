export interface WeatherData {
  city_name: string;
  temperature: number;
  weather_description: string;
  forecast: { date: string; temp: number; description: string }[];
}
