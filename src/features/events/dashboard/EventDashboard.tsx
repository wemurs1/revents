import { Button, Grid } from 'semantic-ui-react';
import EventList from './EventList';
import { useAppSelector } from '../../../app/store/store';
import { useCallback, useEffect, useRef, useState } from 'react';
import { actions } from '../eventSlice';
import { useFireStore } from '../../../app/hooks/firestore/useFireStore';
import EventFilters from './EventFilters';
import { QueryOptions } from '../../../app/hooks/firestore/types';
import EventListItemPlaceholder from './EventListItemPlaceholder';

export default function EventDashboard() {
  const contextRef = useRef(null);
  const { data: events, status } = useAppSelector((state) => state.events);
  const { loadCollection, hasMore } = useFireStore('events');
  const [query, setQuery] = useState<QueryOptions[]>([
    { attribute: 'date', operator: '>=', value: new Date() },
  ]);

  const loadEvents = useCallback((reset?: boolean) => {
    loadCollection(actions, {
      queries: query,
      limit: 2,
      sort: { attribute: 'date', order: 'asc' },
      pagination: true,
      reset,
    });
  }, []);

  useEffect(() => {
    loadEvents(true);
  }, [loadEvents]);

  function loadMore() {
    loadEvents();
  }

  return (
    <Grid>
      <Grid.Column width={10} ref={contextRef}>
        {status === 'loading' ? (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        ) : (
          <>
            <EventList events={events} />
            <Button
              content='Load more'
              color='green'
              onClick={loadMore}
              disabled={!hasMore.current}
            />
          </>
        )}
      </Grid.Column>
      <Grid.Column width={6}>
        <div className='ui fixed top sticky' style={{ top: 98, width: 405 }}>
          <EventFilters setQuery={setQuery} />
        </div>
      </Grid.Column>
    </Grid>
  );
}
