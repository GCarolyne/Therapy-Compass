import {
  AdvancedMarker,
  AdvancedMarkerAnchorPoint,
  AdvancedMarkerRef,
  InfoWindow,
  Map,
  useMapsLibrary,
  useMap,
  Pin,
} from '@vis.gl/react-google-maps';
import { SetStateAction, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './GoogleMap.css';
import { SpinningCircles } from 'react-loading-icons';

type PlaceResult = {
  place_id?: string;
  name?: string;
  address?: string;
  vicinity?: string;
  rating?: number;
};

export function GoogleMap() {
  const { therapyType } = useParams();
  const { marker, refCallback } = useAdvancedMarkerRef();
  const [isOpen, setIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [placesService, setPlacesService] = useState<
    google.maps.places.PlaceResult[]
  >([]);

  const [selectedPlace, setSelectedPlace] = useState<PlaceResult>();

  const map = useMap();
  const placesLibrary = useMapsLibrary('places');

  useEffect(() => {
    if (!placesLibrary || !map || !therapyType) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const svc = new placesLibrary.PlacesService(map);

      const request: google.maps.places.PlaceSearchRequest = {
        location: map.getCenter(),
        radius: 10000,
        type: 'psychotherapy',
        keyword: `${therapyType}`,
      };

      svc.nearbySearch(request, (therapyType, status) => {
        if (status === placesLibrary.PlacesServiceStatus.OK && therapyType) {
          setPlacesService(therapyType);
        } else {
          setError(
            `No results found for ${therapyType} therapists in this area. `
          );
        }

        setIsLoading(false);
      });
    } catch (err) {
      setIsLoading(false);
      setError(
        `An unexpected error occurred: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
    }
  }, [placesLibrary, map, therapyType]);

  function useAdvancedMarkerRef() {
    const [marker, setMarker] = useState<AdvancedMarkerRef | null>(null);
    const refCallback = useCallback((m: AdvancedMarkerRef | null) => {
      setMarker(m);
    }, []);
    return { marker, refCallback };
  }

  const handleMarkerClick = (
    place: SetStateAction<google.maps.places.PlaceResult | undefined>
  ) => {
    setSelectedPlace(place);
    setIsOpen(true);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="location-info">
            <h3 className="text-below-map">
              Your therapy type recommendation is input value here!
            </h3>
          </div>
        </div>
        {isLoading ? (
          <SpinningCircles />
        ) : error ? (
          <div className="error-message">{String(error)}</div>
        ) : (
          <div className="row">
            <div className="map-container">
              <Map
                onClick={() => setSelectedPlace(undefined)}
                style={{ width: '50vw', height: '50vh' }}
                defaultCenter={{ lat: 34.0549, lng: -118.2426 }}
                defaultZoom={12}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                mapId="ecad6d95e15c088a">
                {/* Map over placesService results to create markers for each therapy location */}
                {placesService.map((place, index) => (
                  <AdvancedMarker
                    key={place.place_id || index}
                    ref={index === 0 ? refCallback : undefined} // Only assign ref to first marker
                    onClick={() => handleMarkerClick(place)}
                    position={{
                      lat: place.geometry?.location?.lat() || 34.0549,
                      lng: place.geometry?.location?.lng() || -118.2426,
                    }}
                    anchorPoint={AdvancedMarkerAnchorPoint.BOTTOM}>
                    <Pin>
                      {isOpen && marker && selectedPlace ? (
                        <InfoWindow
                          anchor={marker}
                          onCloseClick={() => setIsOpen(false)}>
                          <div style={{ padding: '20px', minWidth: '100px' }}>
                            <h4>📍{selectedPlace.name}</h4>
                            <h5>{selectedPlace.address}</h5>
                            <h5>⭐ Rating:{selectedPlace.rating}</h5>
                            <h5> 🏢{selectedPlace.vicinity}</h5>
                          </div>
                        </InfoWindow>
                      ) : null}
                    </Pin>
                  </AdvancedMarker>
                ))}
              </Map>
            </div>
          </div>
        )}
        <div className="row">
          <div className="below-map">
            <div className="location-info">
              <p className="text-below-map">
                The map is set to a default location.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
