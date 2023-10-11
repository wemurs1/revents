import { ChangeEvent, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../../app/store/store';
import { createEvent, updateEvent } from '../eventSlice';
import { createId } from '@paralleldrive/cuid2';
import { FieldValues, useForm } from 'react-hook-form';

export default function EventForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onTouched' });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let { id } = useParams();
  const event = useAppSelector((state) =>
    state.events.events.find((e) => e.id === id)
  );

  function onSubmit(data: FieldValues) {
    console.log(data);

    // id = id ?? createId();
    // event
    //   ? dispatch(updateEvent({ ...event, ...values }))
    //   : dispatch(
    //       createEvent({
    //         ...values,
    //         id,
    //         hostedBy: 'bob',
    //         hostPhotoURL: '',
    //         attendees: [],
    //       })
    //     );
    // navigate(`/events/${id}`);
  }

  return (
    <Segment clearing>
      <Header content={event ? 'Update event' : 'Create event'} />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Input
          placeholder='Event title'
          defaultValue={event?.title || ''}
          {...register('title', { required: true })}
          error={errors.title && 'Title is required'}
        />
        <Form.Input
          placeholder='Category'
          defaultValue={event?.category}
          {...register('category', { required: 'Category is required' })}
          error={errors.category && errors.category.message}
        />
        <Form.Input
          placeholder='Description'
          defaultValue={event?.description}
          {...register('description', { required: 'Description is requireed' })}
          error={errors.description && errors.description.message}
        />
        <Form.Input
          placeholder='City'
          defaultValue={event?.city}
          {...register('city', { required: 'City is required' })}
          error={errors.city && errors.city.message}
        />
        <Form.Input
          placeholder='Venue'
          defaultValue={event?.venue}
          {...register('venue', { required: 'Venue is requireed' })}
          error={errors.venue && errors.venue.message}
        />
        <Form.Input
          type='date'
          placeholder='Date'
          defaultValue={event?.date}
          {...register('date', { required: 'Date is required' })}
          error={errors.date && errors.date.message}
        />
        <Button
          type='submit'
          floated='right'
          positive
          content='Submit'
          disabled={!isValid}
        />
        <Button
          type='button'
          floated='right'
          content='Cancel'
          as={Link}
          to='/events'
        />
      </Form>
    </Segment>
  );
}
