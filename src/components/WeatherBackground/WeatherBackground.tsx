import './WeatherBackground.scss';

type WeatherBackgroundProps = {
  weatherType?: string;
};

function WeatherBackground(props: WeatherBackgroundProps) {
  const getClassName = () => {
    const styleClass = [];
    if (props.weatherType) {
      styleClass.push(props.weatherType);
    }
    styleClass.push('t-' + Math.round(new Date().getHours() / 3));
    return styleClass.join(' ');
  };
  return (
    <div className={`weather-background ${getClassName()}`}>
      <div className="layer sky day">
        <div className="layer stars"></div>
        <div className="layer mist"></div>
      </div>
      <div className="layer clouds">
        <div className="shape cloud cloud-0">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="shape cloud cloud-1">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="layer mountains">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <div className="layer snow">
        {[...Array(20)].map((e, i) => (
          <div key={i}></div>
        ))}
      </div>
      <div className="layer hail">
        {[...Array(20)].map((e, i) => (
          <div key={i}></div>
        ))}
      </div>
      <div className="layer rain">
        {[...Array(20)].map((e, i) => (
          <div key={i}></div>
        ))}
      </div>
      <div className="layer fx"></div>
    </div>
  );
}

export default WeatherBackground;
