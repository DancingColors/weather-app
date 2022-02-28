import { SyntheticEvent } from 'react';
import { getDisplayDate, getDisplayTemp } from '../../helpers/displayData';
import { ForecastDay } from '../../types/forecast';
import './DaySelector.scss';

type DaySelectorProps = {
  currentDate?: string;
  forecastDaysData?: ForecastDay[];
  setDate: Function;
};

function DaySelector(props: DaySelectorProps) {
  const handleClick = (e: SyntheticEvent<HTMLDivElement>) => {
    const date = e.currentTarget?.dataset.date;
    if (date) {
      props.setDate(date);
    }
  };

  return (
    <section className="day-selector">
      {props.forecastDaysData?.map((dayData) => (
        <div
          className={`day-selector-item${
            dayData.applicable_date === props.currentDate ? ' selected' : ''
          } ${dayData.weather_state_abbr}`}
          key={dayData.id}
          onClick={handleClick}
          data-date={dayData.applicable_date}>
          <img
            src={`https://www.metaweather.com/static/img/weather/${dayData.weather_state_abbr}.svg`}
            alt={`${dayData.weather_state_name} image`}
            className="day-selector-item-icon"
            width="24px"
            height="24px"
          />
          <div className="day-selector-item-date">
            {getDisplayDate(dayData.applicable_date, 'MM/DD')}
          </div>
          <div className="day-selector-item-temp">
            {getDisplayTemp(dayData.min_temp)}° / {getDisplayTemp(dayData.max_temp)}°
          </div>
        </div>
      ))}
    </section>
  );
}

export default DaySelector;
