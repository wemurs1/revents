import { Grid } from 'semantic-ui-react';
import EventList from './EventList';
import { useAppSelector } from '../../../app/store/store';
import { useEffect } from 'react';
import { actions } from '../eventSlice';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useFireStore } from '../../../app/hooks/firestore/useFireStore';
import EventFilters from './EventFilters';

export default function EventDashboard() {
  const { data: events, status } = useAppSelector((state) => state.events);
  const { loadCollection } = useFireStore('events');

  useEffect(() => {
    loadCollection(actions, {
      queries: [{ attribute: 'date', operator: '>=', value: new Date() }],
    });
  }, [loadCollection]);

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
