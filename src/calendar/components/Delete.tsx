import {
  useAppDispatch,
  useAppSelector,
} from '../../hooks/redux';

import { startDeletingEvent } from '../../context/calendar/calendar.action';

export const Delete = () => {
  const hasEventSelected = useAppSelector(
    (state) => state.calendar.activeEvent
  );
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(startDeletingEvent());
  };

  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={handleDelete}
      style={{
        display: !!hasEventSelected ? '' : 'none',
      }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
