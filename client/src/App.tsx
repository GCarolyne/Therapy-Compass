import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
} from '@vis.gl/react-google-maps';
import './App.css';
const googleKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
export default function App() {
  return (
    <>
      <APIProvider
        apiKey={googleKey}
        onLoad={() => console.log('maps api has loaded')}>
        <Map
          defaultZoom={13}
          defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
          onCameraChanged={(ev: MapCameraChangedEvent) =>
            console.log(
              'camera changed:',
              ev.detail.center,
              'zoom:',
              ev.detail.zoom
            )
          }
        />
      </APIProvider>
    </>
  );
}
