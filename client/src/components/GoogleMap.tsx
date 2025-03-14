import { APIProvider, Map } from '@vis.gl/react-google-maps';
const googleKey = 'AIzaSyARuBpdKXTThVYYvqqQrnFn1xx9q - IanPY';

export function GoogleMap() {
  return (
    <>
      <APIProvider apiKey={googleKey}>
        <Map
          style={{ width: '100vw', height: '100vh' }}
          defaultCenter={{ lat: 33.795, lng: -117.82 }}
          defaultZoom={10}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        />
      </APIProvider>
    </>
  );
}
