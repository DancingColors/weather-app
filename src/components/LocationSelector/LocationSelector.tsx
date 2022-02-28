import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { ForecastLocation } from '../../types/forecast';
import './LocationSelector.scss';

type LocationSelectorProps = {
  onSetLocation: Function;
};

function LocationSelector(props: LocationSelectorProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [locations, setLocations] = useState<ForecastLocation[]>([]);

  useEffect(() => {
    if (searchText.length > 2) {
      const fetchLocations = async () => {
        await fetch(`/api/location/search/?query=${searchText}`).then((res) =>
          res.json().then((result) => {
            setLocations(result);
          })
        );
      }; // TODO: Handle errors
      fetchLocations();
    }
  }, [searchText]);

  const handleTextChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };

  const changeLocation = (newLocation: ForecastLocation) => {
    props.onSetLocation(newLocation.woeid);
    setLocations([]);
    if (inputRef.current) {
      inputRef.current.value = newLocation.title;
    }
  };

  return (
    <section className="location-selector">
      <div className="text-input">
        <input
          type="text"
          name="location"
          autoFocus
          className="location-selector-input"
          placeholder="Search location"
          ref={inputRef}
          onChange={handleTextChange}
        />
        {locations.length > 0 && (
          <ul className="text-input-list">
            {locations.map((location) => (
              <li
                key={location.woeid}
                className="text-input-list-item"
                onClick={() => changeLocation(location)}>
                {location.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default LocationSelector;
