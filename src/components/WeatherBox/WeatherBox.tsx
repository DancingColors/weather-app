import {
  getDisplayDate,
  getDisplayKnotsFromMiles,
  getDisplayTemp
} from '../../helpers/displayData';
import { ForecastDay } from '../../types/forecast';
import './WeatherBox.scss';

type WeatherBoxProps = {
  forecastDay: ForecastDay | undefined;
};

function WeatherBox(props: WeatherBoxProps) {
  return (
    <section className="weather-box">
      {props.forecastDay ? (
        <div className="weather-box-data-wrapper">
          <img
            src={`https://www.metaweather.com/static/img/weather/${props.forecastDay.weather_state_abbr}.svg`}
            alt={`${props.forecastDay.weather_state_name} image`}
            className="weather-box-icon"
            width="50px"
            height="50px"
          />
          <div className="weather-box-date">
            {getDisplayDate(props.forecastDay.applicable_date)}
          </div>
          <div className="weather-box-current-temp">
            {getDisplayTemp(props.forecastDay.the_temp)}
          </div>
          <div className="weather-box-temps">
            {getDisplayTemp(props.forecastDay.min_temp)} /{' '}
            {getDisplayTemp(props.forecastDay.max_temp)}
          </div>
          <div className="weather-box-humidity">{props.forecastDay.humidity}%</div>
          <div className="weather-box-wind">
            <div className="weather-box-wind-compass">{props.forecastDay.wind_direction}</div>
            <div className="weather-box-wind-speed">
              {getDisplayKnotsFromMiles(props.forecastDay.wind_speed)}kn
            </div>
          </div>
          <div className="weather-box-name">{props.forecastDay.weather_state_name}</div>
        </div>
      ) : null}
    </section>
  );
}

export default WeatherBox;
