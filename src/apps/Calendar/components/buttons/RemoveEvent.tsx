/* Context */
import { startDeleteEvent } from '../../context';

/* Hooks */
import { useAppDispatch, useAppSelector } from '../../../../hooks';

export const RemoveEvent = () => {
  const dispatch = useAppDispatch();
  const selectedEvent = useAppSelector((state) => state.calendar.activeEvent);

  const onDelete = () => dispatch(startDeleteEvent());

  return (
    <button
      className={`btn btn-danger fab-danger ${selectedEvent ? '' : 'd-none'}`}
      onClick={onDelete}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
