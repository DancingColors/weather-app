import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import WeatherBox from '../WeatherBox/WeatherBox';
import DaySelector from '../DaySelector/DaySelector';
import LocationSelector from '../LocationSelector/LocationSelector';
import { Forecast } from '../../types/forecast';
import './App.scss';

function App() {
  const [currentWoeid, setCurrentWoeid] = useState<number>(638242);
  const [currentForecast, setCurrentForecast] = useState<Forecast | null>(null);
  const [currentDate, setCurrentDate] = useState<string | null>(dayjs().format('YYYY-MM-DD'));

  useEffect(() => {
    const fetchForecast = async () => {
      await fetch(`/api/location/${currentWoeid}/`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((res) =>
          res.json().then((result) => {
            setCurrentForecast(result);
          })
        )
        .catch((e) => {
          console.log('something went wrong', e);
        });
    };
    fetchForecast();
  }, [currentWoeid]);

  return currentForecast ? (
    <div className="App">
      <header>
        <h2>{currentForecast.title}</h2>
        <h3>{currentForecast.location_type}</h3>
        <h4>{currentForecast.parent.title}</h4>
      </header>
      <LocationSelector onSetLocation={setCurrentWoeid} />
      <WeatherBox
        forecastDay={currentForecast.consolidated_weather.find(
          (cw) => cw.applicable_date === currentDate
        )}
      />
      <DaySelector
        forecastDaysData={currentForecast.consolidated_weather}
        setDate={setCurrentDate}
      />
      <footer>
        <p>
          Powered by{' '}
          <a href="https://www.metaweather.com" target="_blank" rel="noreferrer">
            MetaWeather.com
          </a>
        </p>
      </footer>
    </div>
  ) : null;
}
export default App;
