/* Context */
import { startLogout } from '../../Auth/context';

/* Hooks */
import { useAppDispatch, useAppSelector } from '../../../hooks';

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <nav className="navbar bg-body-tertiary mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        <span className="ms-2">{user.name}</span>
      </span>

      <button
        className="btn btn-outline-danger"
        onClick={() => {
          dispatch(startLogout());
        }}
      >
        <i className="fas fa-sign-out-alt"></i>
        <span className="ms-1">Exit</span>
      </button>
    </nav>
  );
};
