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

// here I implement and pass the query.
const googleKey = 'AIzaSyARuBpdKXTThVYYvqqQrnFn1xx9q - IanPY';

export function GoogleMap() {
  const { marker, refCallback } = useAdvancedMarkerRef();
  const [isOpen, setIsOpen] = useState(false);

  function useAdvancedMarkerRef() {
    const [marker, setMarker] = useState<AdvancedMarkerRef | null>(null);

    const refCallback = useCallback((m: AdvancedMarkerRef | null) => {
      setMarker(m);
    }, []);
    return { marker, refCallback };
  }

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
            ref={refCallback}
            onClick={handleMarkerClick}
            position={{ lat: 33.795, lng: -117.82 }}
            anchorPoint={AdvancedMarkerAnchorPoint.TOP_LEFT}></AdvancedMarker>

          <Pin>
            {isOpen && (
              <InfoWindow anchor={marker} onCloseClick={() => setIsOpen(false)}>
                Info
              </InfoWindow>
            )}
          </Pin>
        </Map>
      </APIProvider>
    </>
  );
}
