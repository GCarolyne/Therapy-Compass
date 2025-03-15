import {
  AdvancedMarker,
  AdvancedMarkerAnchorPoint,
  AdvancedMarkerRef,
  APIProvider,
  InfoWindow,
  Map,
  Pin,
} from '@vis.gl/react-google-maps';
import { useCallback, useState } from 'react';

const googleKey = 'AIzaSyARuBpdKXTThVYYvqqQrnFn1xx9q - IanPY';

export function GoogleMap() {
  // const placesLibrary = useMapsLibrary('places');
  const [isOpen, setIsOpen] = useState(false);

  function useAdvancedMarkerRef() {
    const [marker, setMarker] =
      useState<google.maps.marker.AdvancedMarkerElement | null>(null);

    const refCallback = useCallback((m: AdvancedMarkerRef | null) => {
      setMarker(m);
    }, []);
    return { marker, refCallback };
  }
  const markerRef = useAdvancedMarkerRef();

  const handleMarkerClick = () => {
    setIsOpen(true);
    console.log('yay');
  };
  return (
    <>
      <APIProvider apiKey={googleKey}>
        <Map
          style={{ width: '80vw', height: '80vh' }}
          defaultCenter={{ lat: 33.795, lng: -117.82 }}
          defaultZoom={10}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          mapId="DEMO_MAP_ID">
          <AdvancedMarker
            onClick={handleMarkerClick}
            position={{ lat: 33.795, lng: -117.82 }}
            anchorPoint={AdvancedMarkerAnchorPoint.TOP_LEFT}>
            <Pin>
              {isOpen && (
                <InfoWindow
                  anchor={markerRef}
                  onCloseClick={() => setIsOpen(false)}>
                  Info
                </InfoWindow>
              )}
            </Pin>
          </AdvancedMarker>
        </Map>
      </APIProvider>
    </>
  );
}
