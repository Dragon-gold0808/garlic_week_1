/* eslint-disable prettier/prettier */
import * as React from 'react';
import { useState, useMemo, useEffect } from 'react';
import Map, { Marker, Popup, NavigationControl, FullscreenControl, ScaleControl, GeolocateControl } from 'react-map-gl';
import { getEvents, GarlicEvents } from '@app/api/events.api';
import MapboxClient from '@mapbox/mapbox-sdk/lib/classes/mapi-client';
import GeocodingService, { GeocodeFeature, GeocodeRequest } from '@mapbox/mapbox-sdk/services/geocoding';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import mapboxgl, { Coordinate } from 'mapbox-gl';
import { Space } from 'antd';
import { useAppSelector } from '@app/hooks/reduxHooks';
import styled from 'styled-components';
import { FONT_FAMILY, FONT_SIZE, FONT_WEIGHT } from '@app/styles/themes/constants';

const { Title, Text, Link } = BaseTypography;
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

import GeocoderControl from './GeocoderControl';
import Pin from './pin';

import CITIES from './cities.json';
import 'mapbox-gl/dist/mapbox-gl.css';

const TOKEN = process.env.REACT_APP_MAPBOX_API_TOKEN; // Set your mapbox token here

interface PopupInfo {
  city: string;
  population: string;
  image: string;
  state: string;
  latitude: number;
  longitude: number;
}

export default function Mapbox() {
  const theme = useAppSelector((state) => state.theme.theme);
  const filter: Array<string> = useAppSelector((state) => state.filter.filter.category);
  console.log(theme);
  const [events, setEvents] = useState<GarlicEvents[]>();
  const [data, setData] = useState<GarlicEvents[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [popupInfo, setPopupInfo] = useState<GarlicEvents | null>(null);
  mapboxgl.accessToken = TOKEN ? TOKEN : '';
  const baseClient = new MapboxClient({
    accessToken: TOKEN ? TOKEN : '',
  });
  const geocodingClient = GeocodingService(baseClient);
  console.log(geocodingClient);
  useEffect(() => {
    getEvents()
      .then((res) => setEvents(res))
      .finally(() => setLoaded(true));
  }, []);

  // useEffect(() => {
  //   const filteredEvents = events?.filter((event) => filter.includes(event.category));
  //   setEvents(filteredEvents);
  // }, [filter]);

  console.log(events);
  // useEffect(() => {
  //   // const addresses = ['New York, NY', 'San Francisco, CA', 'London, UK'];
  //   if (events)
  //     events.map((event) => {
  //       const forwardGeocodeRequest: GeocodeRequest = {
  //         query: event.address,
  //         limit: 1,
  //       };
  //       geocodingClient
  //         .forwardGeocode(forwardGeocodeRequest)
  //         .send()
  //         .then((response) => {
  //           const results = response.body.features[0].center;
  //           setData((data) => [...data, { ...event, coordinate: results }]);
  //           console.log(results);
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //     });
  // }, [events, geocodingClient]);
  const garlickyFeature = (popupInfo = { garlickyFeature: '' }) =>
    popupInfo?.garlickyFeature ? (
      <Text style={{ color: 'inherit', fontSize: '13px' }}>
        <span style={{ fontWeight: 'bold' }}>Garlicky Feature: </span>
        {popupInfo.garlickyFeature}
      </Text>
    ) : null;

  console.log(data);
  const pins = useMemo(
    () =>
      events?.map((city, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.coordinate ? city.coordinate[0] : 0}
          latitude={city.coordinate ? city.coordinate[1] : 0}
          anchor="bottom"
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(city);
          }}
        >
          {popupInfo === null ? (
            <Pin
              title={
                <Space direction="vertical" style={{ color: '#f8fbff' }}>
                  <Title level={5} style={{ textAlign: 'center', color: 'inherit' }}>
                    {city.businessName}
                  </Title>
                  {garlickyFeature(city)}
                  {city.address}
                </Space>
              }
              category={city.category}
            />
          ) : (
            <Pin title={<></>} category={city.category} />
          )}
        </Marker>
      )),
    [events, popupInfo],
  );
  console.log(popupInfo);
  const website = (data = '', type = '') =>
    data && data !== 'none' && data != 'N/A' ? (
      <Text>
        {type}
        <Link href={`https://${data}`} target="_blank">
          {data}
        </Link>
      </Text>
    ) : null;
  const StyledPopup = styled(Popup)`
    opacity: 0.5;
  `;
  return (
    <>
      <Map
        initialViewState={{
          latitude: 43.654499139678066,
          longitude: -79.37218608529203,
          zoom: 4.5,
          bearing: 0,
          pitch: 0,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        // mapStyle="mapbox://styles/mapbox/streets-v9"
        // mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxAccessToken={TOKEN}
      >
        <GeocoderControl mapboxAccessToken={TOKEN ? TOKEN : ''} position="top-left" placeholder="Type where to go..." />
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

        {pins}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.coordinate ? popupInfo.coordinate[0] : 0)}
            latitude={Number(popupInfo.coordinate ? popupInfo.coordinate[1] : 0)}
            onClose={() => setPopupInfo(null)}
            maxWidth="400px"
            style={{ fontFamily: FONT_FAMILY.main }}
          >
            <Space direction="vertical">
              <Title level={5} style={{ textAlign: 'center' }}>
                {popupInfo.businessName}
              </Title>
              {garlickyFeature(popupInfo)}
              {popupInfo.details}
              {popupInfo.date}
              {popupInfo.address}
              {popupInfo.city + ',' + popupInfo.postalCode}
              {popupInfo.tel && 'Tel: ' + popupInfo.tel}
              {popupInfo.email && 'Email: ' + popupInfo.email}
              {website(popupInfo.website, 'Website: ')}
              {website(popupInfo.facebook, 'Facebook: ')}
              {website(popupInfo.insta, 'Instagram: ')}
              {website(popupInfo.twitter, 'Twitter: ')}
            </Space>
            {theme === 'dark' ? (
              <style>
                {`
                .mapboxgl-popup-content {
                  background: #1e2142 !important
                }
                .mapboxgl-popup-tip{
                border-bottom-color: #1e2142 !important;
                }
              `}
              </style>
            ) : (
              <style>
                {`
                .mapboxgl-popup-content {
                  background: #f8fbff !important
                }
                .mapboxgl-popup-tip{
                border-bottom-color: #f8fbff !important;
                }
              `}
              </style>
            )}
            {/* <div>{popupInfo.businessName}</div>
            <img
              width="100%"
              src="http://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Downtown_El_Paso_at_sunset.jpeg/240px-Downtown_El_Paso_at_sunset.jpeg"
            /> */}
          </Popup>
        )}
      </Map>

      {/* <ControlPanel /> */}
    </>
  );
}
