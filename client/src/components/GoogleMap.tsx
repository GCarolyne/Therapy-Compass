import {
  AdvancedMarker,
  AdvancedMarkerAnchorPoint,
  AdvancedMarkerRef,
  InfoWindow,
  Map,
  useMapsLibrary,
  Pin,
  useMap,
} from '@vis.gl/react-google-maps';
import { SetStateAction, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// interface PlaceResult {
//   place_id: string;
//   name: string;
//   vicinity: string;
//   rating?: number;
//   user_ratings_total?: number;
//   geometry: {
//     location: {
//       lat: () => number;
//       lng: () => number;
//     };
//   };
// }

export function GoogleMap() {
  const { therapyType } = useParams();
  const { marker, refCallback } = useAdvancedMarkerRef();
  const [isOpen, setIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [placesService, setPlacesService] = useState<
    google.maps.places.PlaceResult[]
  >([]);

  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult>();

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
    console.log('yay');
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <h1 className="locate-header">Locate Your Therapist!</h1>
        </div>
        {isLoading ? (
          <div>Loading therapy locations...</div>
        ) : error ? (
          <div className="error-message">{String(error)}</div>
        ) : (
          <div className="row">
            <div className="map-container">
              <Map
                style={{ width: '50vw', height: '50vh' }}
                defaultCenter={{ lat: 34.0549, lng: -118.2426 }}
                defaultZoom={15}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                mapId="DEMO_MAP_ID">
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
                    <Pin />
                  </AdvancedMarker>
                ))}

                {/* Show InfoWindow when a marker is clicked */}
                {isOpen && marker && selectedPlace ? (
                  <InfoWindow
                    anchor={marker}
                    onCloseClick={() => setIsOpen(false)}>
                    <div style={{ padding: '10px', minWidth: '200px' }}>
                      <h3
                        style={{
                          margin: '0 0 8px 0',
                          fontSize: '16px',
                          color: '#333',
                        }}>
                        {selectedPlace.name}
                      </h3>

                      {selectedPlace.vicinity && (
                        <p
                          style={{
                            margin: '0 0 8px 0',
                            fontSize: '14px',
                            color: '#666',
                          }}>
                          📍 {selectedPlace.vicinity}
                        </p>
                      )}

                      {selectedPlace.formatted_address &&
                        selectedPlace.formatted_address !==
                          selectedPlace.vicinity && (
                          <p
                            style={{
                              margin: '0 0 8px 0',
                              fontSize: '14px',
                              color: '#666',
                            }}>
                            🏢 {selectedPlace.formatted_address}
                          </p>
                        )}

                      {selectedPlace.formatted_phone_number && (
                        <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
                          📞 {selectedPlace.formatted_phone_number}
                        </p>
                      )}

                      {selectedPlace.rating && (
                        <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
                          ⭐ Rating: {selectedPlace.rating} (
                          {selectedPlace.user_ratings_total} reviews)
                        </p>
                      )}

                      {selectedPlace.website && (
                        <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
                          <a
                            href={selectedPlace.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: '#4285F4' }}>
                            🌐 Visit Website
                          </a>
                        </p>
                      )}

                      {selectedPlace.url && (
                        <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
                          <a
                            href={selectedPlace.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: '#4285F4' }}>
                            🗺️ View on Google Maps
                          </a>
                        </p>
                      )}
                    </div>
                  </InfoWindow>
                ) : null}
              </Map>
            </div>
          </div>
        )}
        <div className="row">
          <div className="below-map">
            <h3>
              Please try to take the assessment if you are not seeing desired
              results.
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}
