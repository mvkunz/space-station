type CoordinatesProps = {
  latitude: number;
  longitude: number;
};

function Coordinates(props: CoordinatesProps) {
  const { latitude, longitude } = props;

  return (
    <div className="lat-long-section-wrapper">
      <section className="lat-long-section">
        <div className="lat-long">
          <span>Latitude: {latitude}</span>
        </div>
        <div className="lat-long">
          <span>Longitude: {longitude}</span>
        </div>
      </section>
    </div>
  );
}

export default Coordinates;
