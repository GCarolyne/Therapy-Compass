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

interface PlaceResult {
  place_id: string;
  name: string;
  vicinity: string;
  rating?: number;
  user_ratings_total?: number;
  geometry: {
    location: {
      lat: () => number;
      lng: () => number;
    };
  };
}

export function GoogleMap() {
  const { therapyType } = useParams();
  const { marker, refCallback } = useAdvancedMarkerRef();
  const [isOpen, setIsOpen] = useState(false);
  const [isMap, setIsMap] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const [placesService, setPlacesService] = useState<PlaceResult[]>([]);

  const [selectedPlace, setSelectedPlace] = useState<PlaceResult>();

  const map = useMap();
  const placesLibrary = useMapsLibrary('places');
  console.log(isMap);
  useEffect(() => {
    async function loadTherapyType(therapyType: string) {
      try {
        const response = await fetch(`/googleMaps/${therapyType}`);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        setIsMap(json);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (therapyType) {
      setIsLoading(true);
      loadTherapyType(therapyType);
    }
  }, [therapyType]);

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
        radius: 5000,
        type: 'health',
        keyword: `${therapyType}`,
      };

      svc.nearbySearch(request, (therapyType, status) => {
        if (status === placesLibrary.PlacesServiceStatus.OK && therapyType) {
          setPlacesService(therapyType as unknown as PlaceResult[]);
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
    place: SetStateAction<PlaceResult | undefined>
  ) => {
    setSelectedPlace(place);
    setIsOpen(true);
    console.log('yay');
  };

  return (
    <>
      {isLoading ? (
        <div>Loading therapy locations...</div>
      ) : error ? (
        <div className="error-message">{String(error)}</div>
      ) : (
        <Map
          style={{ width: '80vw', height: '80vh' }}
          defaultCenter={{ lat: 33.795, lng: -117.82 }}
          defaultZoom={10}
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
                lat: place.geometry?.location?.lat() || 33.795,
                lng: place.geometry?.location?.lng() || -117.82,
              }}
              anchorPoint={AdvancedMarkerAnchorPoint.BOTTOM}>
              <Pin />
            </AdvancedMarker>
          ))}

          {/* Show InfoWindow when a marker is clicked */}
          {isOpen && marker && selectedPlace ? (
            <InfoWindow anchor={marker} onCloseClick={() => setIsOpen(false)}>
              <div>
                <h3>{selectedPlace.name}</h3>
                <p>{selectedPlace.vicinity}</p>
                {selectedPlace.rating && (
                  <p>
                    Rating: {selectedPlace.rating} ⭐ (
                    {selectedPlace.user_ratings_total} reviews)
                  </p>
                )}
              </div>
            </InfoWindow>
          ) : null}
        </Map>
      )}
    </>
  );
}
