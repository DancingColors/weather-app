import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import WeatherBox from '../WeatherBox/WeatherBox';
import DaySelector from '../DaySelector/DaySelector';
import LocationSelector from '../LocationSelector/LocationSelector';
import { Forecast } from '../../types/forecast';
import './App.scss';

function App() {
  const [currentWoeid, setCurrentWoeid] = useState<number>(638242);
  const [currentForecast, setCurrentForecast] = useState<Forecast | null>();
  const [currentDate, setCurrentDate] = useState<string | undefined>(dayjs().format('YYYY-MM-DD'));

  useEffect(() => {
    const fetchForecast = async () => {
      setCurrentForecast(null);
      await fetch(`/api/location/${currentWoeid}/`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((res) =>
          res.json().then((result) => {
            setCurrentDate(dayjs().format('YYYY-MM-DD'));
            setCurrentForecast(result);
          })
        )
        .catch((e) => {
          console.log('something went wrong', e);
        });
    };
    fetchForecast();
  }, [currentWoeid]);

  return (
    <div className="App">
      <div className="App-content">
        <header>
          <h1>KFR challenge Weather app</h1>
        </header>
        <span>Location</span>
        <LocationSelector onSetLocation={setCurrentWoeid} />
        <WeatherBox forecast={currentForecast} date={currentDate} />
        <span>Forecast</span>
        <DaySelector
          currentDate={currentDate}
          forecastDaysData={currentForecast?.consolidated_weather}
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
    </div>
  );
}
export default App;
