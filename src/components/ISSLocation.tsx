import { Map, Overlay } from 'pigeon-maps';

type ISSLocationProps = {
  latitude: number;
  longitude: number;
};

function ISSLocation(props: ISSLocationProps) {
  const { latitude, longitude } = props;
  return (
    <main>
      <div className="map">
        <Map
          center={[0, 0]}
          defaultWidth={320}
          height={450}
          minZoom={1.5}
          maxZoom={8}
          zoom={1.5}
        >
          <Overlay anchor={[latitude, longitude]} offset={[20, 0]}>
            <img
              width={60}
              src="https://betrybe.github.io/images/iss/iss-img.png"
              alt="international space station"
            />
          </Overlay>
        </Map>
      </div>{' '}
    </main>
  );
}

export default ISSLocation;
