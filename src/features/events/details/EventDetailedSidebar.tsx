import { Segment, Item } from 'semantic-ui-react';
import { AppEvent } from '../../../app/types/event';

type Props = {
  event: AppEvent;
};

export default function EventDetailedSidebar({ event }: Props) {
  return (
    <>
      <Segment
        textAlign='center'
        style={{ border: 'none' }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        {event.attendees.length} People Going
      </Segment>
      <Segment attached>
        <Item.Group relaxed divided>
          {event.attendees.map((attendee) => (
            <Item style={{ position: 'relative' }} key={attendee.id}>
              <Item.Image size='tiny' src={attendee.photoURL || '/user.png'} />
              <Item.Content verticalAlign='middle'>
                <Item.Header as='h3'>
                  <span>{attendee.displayName}</span>
                </Item.Header>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    </>
  );
}
