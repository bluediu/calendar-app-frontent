/* Context */
import { startDeleteEvent } from '../../context';

/* Hooks */
import { useAppDispatch } from '../../../../hooks';
import { useUserAuthorization } from '../../hooks';

export const RemoveEvent = () => {
  const dispatch = useAppDispatch();

  const onDelete = () => dispatch(startDeleteEvent());

  const isUserAuthorized = useUserAuthorization();

  return (
    <button
      className={`btn btn-danger fab-danger ${
        isUserAuthorized ? '' : 'd-none'
      }`}
      onClick={onDelete}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
