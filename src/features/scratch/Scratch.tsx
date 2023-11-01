import { Button, Dropdown } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../app/store/store';
import { decrement, increment, incrementByAmount } from './testSlice';
import { openModal } from '../../app/common/modals/modalSlice';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

export default function Scratch() {
  const {
    suggestions: { data: locations, loading },
    setValue,
  } = usePlacesAutocomplete();
  const { data } = useAppSelector((state) => state.test);
  const dispatch = useAppDispatch();

  async function handlePlaceSelect(value: any) {
    const results = await getGeocode({ address: value });
    const latlng = getLatLng(results[0]);
    console.log(latlng);
  }

  return (
    <div>
      <h1>Scratch page</h1>
      <h3>The data is: {data}</h3>
      <Button
        onClick={() => dispatch(increment())}
        color='green'
        content='Increment'
      />
      <Button
        onClick={() => dispatch(decrement())}
        color='red'
        content='Decrement'
      />
      <Button
        onClick={() => dispatch(incrementByAmount(5))}
        color='teal'
        content='Increment by 5'
      />
      <Button
        onClick={() => dispatch(openModal({ type: 'TestModal', data: data }))}
        color='teal'
        content='Open modal'
        style={{ marginBottom: 20 }}
      />
      <Dropdown
        placeholder='Search for location'
        loading={loading}
        fluid
        search
        selection
        options={locations.map(({ description }) => ({
          text: description,
          value: description,
        }))}
        onSearchChange={(e: any) => {
          setValue(e.target.value);
        }}
        onChange={(_e, data) => {
          handlePlaceSelect(data.value);
        }}
      />
    </div>
  );
}
