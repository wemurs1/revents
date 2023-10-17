import { Header, Menu } from 'semantic-ui-react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { useState } from 'react';

export default function EventFilters() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <Menu vertical size='large' style={{ width: '100%' }}>
        <Header icon='filter' attached color='teal' content='filters' />
        <Menu.Item content='All events' />
        <Menu.Item content="I'm going" />
        <Menu.Item content="I'm hosting" />
      </Menu>
      <Header icon='calendar' attached color='teal' content='Select date' />
      <Calendar
        onChange={(date) => setStartDate(date as Date)}
        value={startDate}
      />
    </>
  );
}
