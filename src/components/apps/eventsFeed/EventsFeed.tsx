/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { getEvents, GarlicEvents } from '@app/api/events.api';

export const EventsFeed = () => {
  const [events, setEvents] = useState<GarlicEvents[]>([]);
  const [hasMore] = useState<boolean>(true);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    getEvents()
      .then((res) => setEvents(res))
      .finally(() => setLoaded(true));
  }, []);

  const next = () => {
    getEvents().then((newEvents) => setEvents(events.concat(newEvents)));
  };

  return events;
};
