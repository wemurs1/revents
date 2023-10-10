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
  selectEvent: (event: AppEvent | null) => void;
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

  function updateEvent(updatedEvent: AppEvent) {
    setEvents(
      events.map((evt) => (evt.id === updatedEvent.id ? updatedEvent : evt))
    );
    selectEvent(null);
    setFormOpen(false);
  }

  function deleteEvent(eventId: string) {
    setEvents(events.filter((evt) => evt.id !== eventId));
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          events={events}
          selectEvent={selectEvent}
          deleteEvent={deleteEvent}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {formOpen && (
          <EventForm
            setFormOpen={setFormOpen}
            addEvent={addEvent}
            selectedEvent={selectedEvent}
            key={selectedEvent ? selectedEvent.id : 'create'}
            updateEvent={updateEvent}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
