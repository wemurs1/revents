import { Link, useNavigate } from 'react-router-dom';
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import { useAppSelector } from '../../store/store';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';

export default function SignedInMenu() {
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.auth);

  async function handleSignOut() {
    await signOut(auth);
    navigate('/');
  }

  return (
    <Menu.Item position='right'>
      <Image avatar spaced='right' src='/user.png' />
      <Dropdown pointing='top left' text={currentUser?.email as string}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to='createEvent'
            text='Create event'
            icon='plus'
          />
          <Dropdown.Item text='My profile' icon='user' />
          <Dropdown.Item text='Sign out' icon='power' onClick={handleSignOut} />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}
