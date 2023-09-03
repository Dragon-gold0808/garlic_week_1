/* eslint-disable prettier/prettier */
import * as React from 'react';
import { useState, useMemo, useEffect } from 'react';
import Map, { Marker, Popup, NavigationControl, FullscreenControl, ScaleControl, GeolocateControl } from 'react-map-gl';
import { getEvents, GarlicEvents } from '@app/api/events.api';
import MapboxClient from '@mapbox/mapbox-sdk/lib/classes/mapi-client';
import GeocodingService, { GeocodeFeature, GeocodeRequest } from '@mapbox/mapbox-sdk/services/geocoding';
import mapboxgl, { Coordinate } from 'mapbox-gl';

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

import ControlPanel from './Control-Panel';
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
  const [events, setEvents] = useState<GarlicEvents[]>([
    {
      _id: '64f179499c0e661b016cc10b',
      category: 'Farm',
      businessName: 'Flycreek farm',
      typeOfParticipant: "Sell my Ontario garlic from my farm, farmer's market or other location",
      garlickyFeature: 'Farm stand garlic sales, culinary and seed.',
      address: '9887 Flycreek Rd',
      date: 'Sept 22-Oct 1, 10am to 5pm',
      city: 'North Augusta',
      postalCode: 'K0g1r0 ',
      email: 'Brandyjackson1@gmail.com',
      website: 'Flycreekfarm.ca',
      insta: 'Flycreek_farm',
      coordinate: [-75.779265, 44.741599],
    },
    {
      _id: '64f179499c0e661b016cc10c',
      category: 'Farm',
      businessName: 'Indian Creek Orchard Gardens',
      typeOfParticipant: "Sell my Ontario garlic from my farm, farmer's market or other location",
      garlickyFeature:
        'Selling seed and culinary garlic, also our season end scratch and dent garlic sale will be taking place',
      address: '919 Sugar Bush Road',
      date: 'Sept 23, Sept 28, Sept 30',
      city: 'Pakenham',
      postalCode: 'K0A2X0',
      tel: '(613) 914-7444',
      email: 'scott@indiancreekorchard.ca',
      website: 'www.indiancreekorchard.ca',
      facebook: 'https://www.facebook.com/indiancreekorchard',
      coordinate: [-76.2918124, 45.2504235],
    },
    {
      _id: '64f179499c0e661b016cc10d',
      category: 'Farm',
      businessName: 'Creation Farms ',
      typeOfParticipant: "Sell my Ontario garlic from my farm, farmer's market or other location",
      garlickyFeature:
        'We grow no-spray, hardneck variety, Music Garlic freshly cured ready for all your culinary adventures. We also have our much loved and potent Garlic Himalayan Pink Salt gourmet spice available at the Newmarket Farmers Market every Saturday until October 1, and that runs between 8am-1pm. We hope to see you there!',
      address: 'Riverwalk Commons, 200 Doug Duncan Dr, Newmarket, ON L3Y 3Y9 Newmarket, Ontario ',
      date: 'Sept 22-Oct 1',
      city: 'Newmarket ',
      postalCode: 'L3Y 3Y9',
      email: 'Creationfarmson@gmail.com',
      website: 'www.creationfarms.ca',
      facebook: 'N/a',
      insta: '@creationfarmsontario',
      twitter: 'N/a',
      restaurant: 'Our all-natural product is offered at the in person Newmarket Farmers Market',
      otherSocialMedia: 'N/a',
      coordinate: [-79.457357, 44.055766],
    },
    {
      _id: '64f179499c0e661b016cc10e',
      category: 'Farm',
      businessName: 'Food 4 Life Market Garden',
      typeOfParticipant:
        "Sell my Ontario garlic from my farm, farmer's market or other location, Prepare and sell a savoury dish, dessert or beverage, made with Ontario grown garlic, Sell a garlic-themed craft or wellness product, Host an in-person or virtual garlic presentation or cooking demo, Host a garlic farmer and/or sell their garlic from my location",
      garlickyFeature:
        'Black garlic products: whole bulbs, sea salt, balsamic vinegar, powder. Regular garlic bulbs. Pickled garlic cloves. Garlic scapes: Pickled garlic scapes & cloves mix, sea salt, powder',
      address: '215 Victoria Ave, Fenwick, ON, L0S 1C0 ',
      date: 'Sept 22-Oct 1',
      hours: 'Mon-Fri 10am-4pm, Sat-Sun 9am-2pm',
      streetAddress2: 'St. Catherines Farmers Market: 91 King St. St. Catharines, ON, L2R (Sept 23: 7am-1pm) 3H6',
      city: 'Fenwick',
      postalCode: 'L0S 1C0',
      tel: '647 347 0887',
      email: 'info@food4lifemarket.com',
      website: 'www.food4lifemarket.com',
      facebook: 'www.facebook.com/food4lifemarketgarden',
      insta: '@food4lifemarketgarden',
      restaurant: 'Online orders, Farm gate; farmers market; special events',
      coordinate: [-79.3769466, 42.9633281],
    },
    {
      _id: '64f179499c0e661b016cc10f',
      category: "Farmer's Market",
      businessName: "Waterdown Farmers' Market",
      typeOfParticipant:
        "Sell my Ontario garlic from my farm, farmer's market or other location, Kids Craft at Farmers' Market - Magical Garlic Wand. ",
      garlickyFeature:
        'We can highlight vendors that have garlic at our market on our social media. We can also plan to do a kids craft for market goers to make a magical garlic wand! ',
      address: 'Royal Canadian Legion Br. 551 ',
      date: 'Sept 30, 8 am-1 pm',
      streetAddress2: '79 Hamilton St. N',
      city: 'Waterdown',
      postalCode: 'L0R 2H0',
      tel: '289-260-6841',
      email: 'farmersmarket@waterdownvillage.ca',
      website: 'waterdownfarmersmarket.ca',
      facebook: 'https://www.facebook.com/waterdownfarmersmarket',
      insta: 'https://www.instagram.com/waterdownfarmersmarket/',
      twitter: 'https://twitter.com/WaterdownMarket',
      restaurant: "Take out/delivery, Access for persons with disabilities, Farmers' Market",
      coordinate: [-51.6197890205486, -9.58890301712257],
    },
    {
      _id: '64f179499c0e661b016cc110',
      category: "Farmer's Market",
      businessName: 'Ottawa Markets',
      typeOfParticipant:
        "Sell my Ontario garlic from my farm, farmer's market or other location, Host a garlic farmer and/or sell their garlic from my location",
      garlickyFeature: 'Vendors will be engaged in selling garlic and garlic themed products! ',
      address: '366 Parkdale Ave ',
      city: 'Ottawa',
      postalCode: 'K1Y1G8',
      tel: '613-244-4410',
      email: 'info@ottawamarkets.ca',
      website: 'ottawamarkets.ca',
      facebook: 'https://www.facebook.com/MarketsOttawa',
      insta: 'https://www.instagram.com/ottawamarkets/',
      restaurant: 'Patio, Take out/delivery',
      coordinate: [-75.73007, 45.401418],
    },
    {
      _id: '64f179499c0e661b016cc111',
      category: 'Restaurant',
      businessName: 'Beefcake’s Burger Factory',
      typeOfParticipant: 'Prepare and sell a savoury dish, dessert or beverage, made with Ontario grown garlic',
      garlickyFeature: 'Garlic Havarti Burger',
      details: 'Made with garlic sourced from Hogans Farm',
      address: '481 Hodder Avenue',
      date: 'Sept 22-Oct 1',
      city: 'Thunder Bay ',
      postalCode: 'P7A1V3',
      tel: '8076836757',
      facebook: 'Beefcakes Burger Factory ',
      twitter: '@beefcakeburger ',
      restaurant: 'Dine in, Take out/delivery, Online orders',
      coordinate: [-89.182478, 48.468662],
    },
    {
      _id: '64f179499c0e661b016cc112',
      category: 'Restaurant',
      businessName: 'Barrel Restaurant',
      typeOfParticipant: 'Prepare and sell a savoury dish, dessert or beverage, made with Ontario grown garlic',
      garlickyFeature: 'sell garlic bread',
      address: '131 Queensway West ',
      date: 'Sept 22-Oct 1',
      city: 'Simcoe',
      postalCode: 'N3Y2M8',
      tel: '5194260068',
      email: 'info@barrelrestaurant.ca',
      website: 'www.barrelrestaurant.ca',
      facebook: 'barrelrestaurantsimcoe',
      insta: 'barrelpizzaspaghettihouse',
      twitter: '@Barrel87',
      restaurant:
        'Dine in, Full-service/table service, Patio, Take out/delivery, Online orders, Access for persons with disabilities',
      coordinate: [-80.312591, 42.845589],
    },
    {
      _id: '64f179499c0e661b016cc113',
      category: "Farmer's Market",
      businessName: "Port Rowan Farmers' Market",
      typeOfParticipant: 'Host a garlic farmer and/or sell their garlic from my location',
      garlickyFeature:
        "We have a few vendors with their homegrown garlic.  Not sure - might ask bakery to do 'garlic' themed food, or run a contest.  ",
      address: 'Lions Pavilion in Port Rowan Harbour',
      date: 'Sept. 22, 2-4 pm; Sept 29, 4-5 pm',
      streetAddress2: '11 Sea Queen Rd.',
      city: 'Port Rowan',
      postalCode: 'N0E 1M0',
      tel: '519-586-9532',
      email: 'portrowanfarmersmarket@gmail.com',
      website: 'www.portrowanfarmersmarket.ca',
      facebook: 'https://www.facebook.com/PortRowanFarmersMarket',
      insta: "portrowanfarmersmarket's profile picture portrowanfarmersmarket",
      twitter: 'none',
      coordinate: [78.476681027237, 22.1991660760527],
    },
    {
      _id: '64f179499c0e661b016cc114',
      category: 'Restaurant',
      businessName: 'Fringale',
      typeOfParticipant:
        'Prepare and sell a savoury dish, dessert or beverage, made with Ontario grown garlic, I will make a small batch of garlic hot sauce for sale only during that period of time. Very small quantities, maybe 40 bottles. ',
      garlickyFeature: 'Not sure yet. ',
      address: '1177 Queen St. East ',
      date: 'Sept 22-Oct 1',
      city: 'Toronto',
      postalCode: 'M4M 1L5',
      tel: '416-206-1289',
      email: 'hi@jefringale.ca',
      website: 'jefringale.ca',
      facebook: 'https://www.facebook.com/jefringale',
      insta: '@jefringale',
      restaurant: 'Dine in, Patio, Take out/delivery, Online orders',
      coordinate: [-79.332394, 43.662553],
    },
    {
      _id: '64f179499c0e661b016cc115',
      category: "Farmer's Market",
      businessName: "Orillia Farmers' Market",
      typeOfParticipant: 'Organize a community garlic-themed event',
      garlickyFeature: 'not sure',
      address: '36 Mississaga Street W',
      date: 'Sept 23, Sept 30 ',
      city: 'Orillia',
      postalCode: 'L3V 3A6',
      tel: '705-238-7955',
      email: 'dsmith@orillia.ca',
      website: 'www.orillia.ca/ofm',
      facebook: 'https://www.facebook.com/orilliafarmersmarket',
      insta: 'https://www.instagram.com/orilliafarmersmarket/',
      coordinate: [-79.420608, 44.608378],
    },
    {
      _id: '64f179499c0e661b016cc116',
      category: 'Farm',
      businessName: 'Count Von Garlic',
      typeOfParticipant: "Sell my Ontario garlic from my farm, farmer's market or other location",
      garlickyFeature: 'Selling garlic',
      address: 'Our Property',
      date: 'Sept 22-Oct 1',
      streetAddress2: '52 Church Street West',
      city: 'Burgessville',
      postalCode: 'N0J1C0',
      tel: '2267476559',
      email: 'sales@countvongarlic.com',
      website: 'https://countvongarlic.com/',
      twitter: '@CountVonGarlic',
      coordinate: [-74.124317, 40.004038],
    },
    {
      _id: '64f179499c0e661b016cc117',
      category: 'Restaurant',
      businessName: 'EPO ALPHONSAS GOURMET INC',
      typeOfParticipant:
        "Sell my Ontario garlic from my farm, farmer's market or other location, Prepare and sell a savoury dish, dessert or beverage, made with Ontario grown garlic",
      garlickyFeature: 'Garlic Jelly .. ',
      address: 'Septemer 29, Erinmills farmers market, 2520 Eglinton Ave West, Mississagua ',
      date: 'Sept 29, Oct 1',
      streetAddress2: '29 Harman drive',
      city: 'Ajax',
      postalCode: 'L1S 5h7',
      tel: '647 267 8746',
      email: 'alphonsas@rogers.com',
      website: 'www.alphonsas.ca',
      facebook: 'https://www.facebook.com/alphonsasgourmet',
      insta: 'https://www.instagram.com/alphonsasgourmet/',
      coordinate: [-79.470804, 43.691362],
    },
    {
      _id: '64f179499c0e661b016cc118',
      category: 'Special Activity',
      businessName: 'Brant County Garlic Company Inc',
      typeOfParticipant: "Sell my Ontario garlic from my farm, farmer's market or other location",
      garlickyFeature: 'Mentor New Growers and Gardeners',
      details: 'Learn from Famer Bob Romaniuk’s 35 years growing garlic. Register on website, limited seats.',
      address: '298 13th Concession Road',
      date: 'Sept 25, 7 am to 8 pm',
      city: 'Scotland',
      postalCode: 'N0E 1R0',
      tel: '519-751-9200',
      email: 'bob@brantcountygarliccompany.com',
      website: 'www.brantcountygarliccompany.com',
      coordinate: [-80.4658347, 43.021205],
    },
  ]);
  const [data, setData] = useState<GarlicEvents[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);
  mapboxgl.accessToken = 'pk.eyJ1IjoicG9ldHRlciIsImEiOiJjbGNveTh6aWcwMzV5M3dxeWo0bGY1bjRtIn0.9eyZv-FPct5JLpvdEMmAyg';
  const baseClient = new MapboxClient({
    accessToken: 'pk.eyJ1IjoicG9ldHRlciIsImEiOiJjbGNveTh6aWcwMzV5M3dxeWo0bGY1bjRtIn0.9eyZv-FPct5JLpvdEMmAyg',
  });
  const geocodingClient = GeocodingService(baseClient);
  console.log(geocodingClient);
  // useEffect(() => {
  //   getEvents()
  //     .then((res) => setEvents(res))
  //     .finally(() => setLoaded(true));
  // }, []);

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
  console.log(data);
  const pins = useMemo(
    () =>
      events.map((city, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.coordinate[0]}
          latitude={city.coordinate[1]}
          anchor="bottom"
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            // setPopupInfo(city);
          }}
        >
          <Pin title={city.businessName} />
        </Marker>
      )),
    [],
  );

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
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

        {pins}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              {popupInfo.city}, {popupInfo.state} |{' '}
              <a
                target="_new"
                href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
              >
                Wikipedia
              </a>
            </div>
            <img width="100%" src={popupInfo.image} />
          </Popup>
        )}
      </Map>

      {/* <ControlPanel /> */}
    </>
  );
}
