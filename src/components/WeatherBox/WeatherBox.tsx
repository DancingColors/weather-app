import { getDisplayDate } from '../../helpers/displayData';
import { ForecastDay } from '../../types/forecast';
import './WeatherBox.scss';

type WeatherBoxProps = {
  forecastDay: ForecastDay | undefined;
};

function WeatherBox(props: WeatherBoxProps) {
  return (
    <div className="weather-box">
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
          <div className="weather-box-name">{props.forecastDay.weather_state_name}</div>
        </div>
      ) : null}
    </div>
  );
}

function getDisplayTemp(rawTemp: number) {
  const displayTemp = rawTemp.toString();
  return displayTemp.slice(0, displayTemp.indexOf('.') + 2) + '°';
}
export default WeatherBox;
