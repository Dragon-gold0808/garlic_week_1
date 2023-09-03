/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import MapboxClient from '@mapbox/mapbox-sdk/lib/classes/mapi-client';
import GeocodingService, { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import mapboxgl, { Coordinate } from 'mapbox-gl';
import { getEvents, GarlicEvents } from '@app/api/events.api';

// interface GeoResult {
//   center: Array<number>;
// }

export const MapboxForwardGeocoding = () => {
  const [events, setEvents] = useState<GarlicEvents[]>([]);
  const [data, setData] = useState<GarlicEvents[]>([]);
  const [hasMore] = useState<boolean>(true);
  const [loaded, setLoaded] = useState<boolean>(false);
  // const [coordinates, setCoordinates] = useState<Array<Array<any>>>();
  mapboxgl.accessToken = String(process.env.REACT_APP_MAPBOX_API_KEY);
  const baseClient = new MapboxClient({ accessToken: String(process.env.REACT_APP_MAPBOX_API_KEY) });
  const geocodingClient = GeocodingService(baseClient);

  useEffect(() => {
    getEvents()
      .then((res) => setEvents(res))
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    // const addresses = ['New York, NY', 'San Francisco, CA', 'London, UK'];

    events.map((event, key) => {
      const forwardGeocodeRequest = {
        query: event.address,
        limit: 1,
      };
      geocodingClient
        .forwardGeocode(forwardGeocodeRequest)
        .send()
        .then((response) => {
          const results = response.body.features[0].center;
          setData((data) => [...data, { ...data[key], coordinate: results }]);
          console.log(results);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }, []);
  console.log(data);
  return data;
};
