import { Grid } from 'semantic-ui-react';
import EventList from './EventList';
import EventForm from '../form/EventForm';
import { useEffect, useState } from 'react';
import { AppEvent } from '../../../app/types/event';
import { sampleData } from '../../../app/api/sampleData';

type Props = {
  formOpen: boolean;
  setFormOpen: (value: boolean) => void;
  selectedEvent: AppEvent | null;
  selectEvent: (event: AppEvent) => void;
};

export default function EventDashboard({
  formOpen,
  setFormOpen,
  selectedEvent,
  selectEvent,
}: Props) {
  const [events, setEvents] = useState<AppEvent[]>([]);

  useEffect(() => {
    setEvents(sampleData);
  }, []);

  function addEvent(event: AppEvent) {
    setEvents((prevstate) => {
      return [...prevstate, event];
    });
  }

  function handleSelectEvent(event: AppEvent) {
    selectEvent(event);
    setFormOpen(true);
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} selectEvent={handleSelectEvent} />
      </Grid.Column>
      <Grid.Column width={6}>
        {formOpen && (
          <EventForm
            setFormOpen={setFormOpen}
            addEvent={addEvent}
            selectedEvent={selectedEvent}
            key={selectedEvent ? selectedEvent.id : 'create'}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
