import WeatherBox from '../WeatherBox/WeatherBox';
import './App.scss';
import { Forecast } from '../../types/forecast';
import { useState } from 'react';
import DaySelector from '../DaySelector/DaySelector';
import dayjs from 'dayjs';

import forecast from '../../dev/forecast.json'; // TESTTEST

function App() {
  const currentForecast = forecast as Forecast;
  const [currentDate, setCurrentDate] = useState<string | null>(dayjs().format('YYYY-MM-DD'));
  return currentForecast ? (
    <div className="App">
      <header>
        <h2>{forecast.title}</h2>
        <h3>{forecast.location_type}</h3>
        <h4>{forecast.parent.title}</h4>
      </header>
      <WeatherBox
        forecastDay={currentForecast.consolidated_weather.find(
          (cw) => cw.applicable_date === currentDate
        )}
      />
      <DaySelector
        forecastDaysData={currentForecast.consolidated_weather}
        setDate={setCurrentDate}
      />
    </div>
  ) : null;
}
export default App;
