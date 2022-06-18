import { addHours } from 'date-fns';
import {
  onOpenDateModal,
  onSetActiveEvent,
} from '../../context';
import { useAppDispatch } from '../../hooks/redux';

export const AddNew = () => {
  // const { setActiveEvent } = useCalendarStore();
  const dispath = useAppDispatch();

  const handleClickNew = () => {
    dispath(
      onSetActiveEvent({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2),
        bgColor: '#fafafa',
        user: {
          _id: '',
          name: '',
        },
      })
    );

    dispath(onOpenDateModal());
  };

  return (
    <button
      className="btn btn-primary fab"
      onClick={handleClickNew}
    >
      <i className="fas fa-plus"></i>
    </button>
  );
};
