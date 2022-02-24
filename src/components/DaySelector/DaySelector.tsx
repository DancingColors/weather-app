import { SyntheticEvent } from 'react';
import { getDisplayDate } from '../../helpers/displayData';
import { ForecastDay } from '../../types/forecast';
import './DaySelector.scss';

type DaySelectorProps = {
  forecastDaysData: ForecastDay[];
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
    <div className="day-selector">
      {props.forecastDaysData?.length
        ? props.forecastDaysData.map((dayData) => (
            <div
              className="day-selector-item"
              key={dayData.id}
              onClick={handleClick}
              data-date={dayData.applicable_date}>
              <div className="day-selector-item-date">
                {getDisplayDate(dayData.applicable_date)}
              </div>
              <img
                src={`https://www.metaweather.com/static/img/weather/${dayData.weather_state_abbr}.svg`}
                alt={`${dayData.weather_state_name} image`}
                className="day-selector-item-icon"
                width="24px"
                height="24px"
              />
            </div>
          ))
        : null}
    </div>
  );
}

export default DaySelector;
