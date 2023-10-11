import LoginForm from '../../../features/auth/LoginForm';
import TestModal from '../../../features/scratch/TestModal';
import { useAppSelector } from '../../store/store';

export default function ModalManager() {
  const modalLookup = {
    TestModal,
    LoginForm,
  };
  const { type, data, open } = useAppSelector((state) => state.modals);
  let renderedModal;

  if (open && type) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ModalComponent = (modalLookup as any)[type];
    renderedModal = <ModalComponent data={data} />;
  }

  return <span>{renderedModal}</span>;
}
