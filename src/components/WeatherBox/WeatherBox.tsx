import { useEffect, useState } from 'react';
import {
  getDisplayDate,
  getDisplayKnotsFromMiles,
  getDisplayTemp
} from '../../helpers/displayData';
import { Forecast, ForecastDay } from '../../types/forecast';
import WeatherBackground from '../WeatherBackground/WeatherBackground';
import './WeatherBox.scss';

type WeatherBoxProps = {
  forecast: Forecast | null | undefined;
  date?: string;
};

function WeatherBox(props: WeatherBoxProps) {
  const [forecastDay, setForecastDay] = useState<ForecastDay>();

  useEffect(() => {
    if (props.forecast) {
      const todayData = props.forecast.consolidated_weather.find(
        (cw) => cw.applicable_date === props.date
      );
      if (todayData) {
        setForecastDay(todayData);
      } else {
        setForecastDay(props.forecast.consolidated_weather[0]);
      }
    }
  }, [props.forecast, props.date]);

  return (
    <section className="weather-box">
      {props.forecast && forecastDay ? (
        <>
          <WeatherBackground weatherType={forecastDay?.weather_state_abbr} />
          <div className={`weather-box-content ${forecastDay?.weather_state_abbr}`}>
            {/* Location name and icon */}
            <header>
              <div className="location-title">
                <h2>
                  {props.forecast.title} <span>({props.forecast.parent.title})</span>
                </h2>
              </div>
              <img
                className="weather-box-icon"
                src={`https://www.metaweather.com/static/img/weather/${forecastDay.weather_state_abbr}.svg`}
                alt={`${forecastDay.weather_state_name} image`}
                width="50px"
                height="50px"
              />
            </header>

            {/* Date */}
            <div className="weather-box-content-date">
              {getDisplayDate(forecastDay.applicable_date, 'dddd DD MMM')}
            </div>

            {/* Current temperature */}
            <div className="weather-box-content-current-temp">
              {getDisplayTemp(forecastDay.the_temp)}
              <sup>°</sup>
            </div>

            {/* Min/max temperatures */}
            <div className="weather-box-content-temps">
              {getDisplayTemp(forecastDay.min_temp)}° / {getDisplayTemp(forecastDay.max_temp)}°
            </div>

            {/* Weather state name */}
            <div className="weather-box-content-name">{forecastDay.weather_state_name}</div>

            {/* Wind */}
            <div className="weather-box-content-wind">
              <h3>{forecastDay.wind_direction_compass} wind</h3>
              <div className="weather-box-content-wind-compass">
                <i
                  className="icon arrow"
                  style={{ transform: `rotate(${forecastDay.wind_direction + 45}deg)` }}></i>
              </div>
              <div className="weather-box-content-wind-speed">
                {getDisplayKnotsFromMiles(forecastDay.wind_speed)}knots
              </div>
            </div>

            {/* Humidity */}
            <div className="weather-box-content-humidity">
              <h3>Humidity</h3>
              <div className="value">{forecastDay.humidity}%</div>
            </div>
          </div>
        </>
      ) : (
        <div className="loading-message">Loading...</div>
      )}
    </section>
  );
}

export default WeatherBox;
