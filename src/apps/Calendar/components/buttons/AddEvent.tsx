import { addHours } from 'date-fns';

/* Context */
import { onOpenDateModal, onSetActiveEvent } from '../../context';

/* Hooks */
import { useAppDispatch } from '../../../../hooks';

export const AddEvent = () => {
  const dispatch = useAppDispatch();

  const handleAddNew = () => {
    dispatch(
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

    dispatch(onOpenDateModal());
  };

  return (
    <button className="btn btn-primary fab" onClick={handleAddNew}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
