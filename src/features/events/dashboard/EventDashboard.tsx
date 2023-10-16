import { Grid } from 'semantic-ui-react';
import EventList from './EventList';
import { useAppSelector } from '../../../app/store/store';
import { useEffect, useState } from 'react';
import { actions } from '../eventSlice';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useFireStore } from '../../../app/hooks/firestore/useFireStore';
import EventFilters from './EventFilters';
import { QueryOptions } from '../../../app/hooks/firestore/types';

export default function EventDashboard() {
  const { data: events, status } = useAppSelector((state) => state.events);
  const { loadCollection } = useFireStore('events');
  const [query, setQuery] = useState<QueryOptions[]>([
    { attribute: 'date', operator: '>=', value: new Date() }
  ])

  useEffect(() => {
    loadCollection(actions, {
      queries: query
    })
  }, [loadCollection, query])

  if (status === 'loading') return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventFilters />
      </Grid.Column>
    </Grid>
  );
}
