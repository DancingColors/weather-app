export interface ForecastDay {
  id: number;
  weather_state_abbr: string;
  weather_state_name: 'Heavy Rain' | 'Showers' | 'Heavy Cloud' | 'Light Cloud' | 'Clear';
  wind_direction_compass: 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';
  created: string;
  applicable_date: string;
  min_temp: number;
  max_temp: number;
  the_temp: number;
  wind_speed: number;
  wind_direction: number;
  air_pressure: number;
  humidity: number;
  visibility: number;
  predictability: number;
}

interface ForecastSource {
  title: string;
  slug: string;
  url: string;
  crawl_rate: number;
}

export interface Forecast {
  consolidated_weather: ForecastDay[];
  time: string;
  sun_rise: string;
  sun_set: string;
  timezone_name: 'LMT' | 'GTM';
  parent: {
    title: string;
    location_type: string;
    woeid: number;
    latt_long: string;
  };
  sources: ForecastSource[];
  title: string;
  location_type: string;
  woeid: number;
  latt_long: string;
  timezone: string;
}
