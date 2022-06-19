import { useAppDispatch } from '../../hooks/redux';

import { startLogout } from '../../context/auth/auth.actions';

export const Navbar = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        &nbsp; Josue
      </span>

      <button
        className="btn btn-outline-danger"
        onClick={() => {
          dispatch(startLogout());
        }}
      >
        <i className="fas fa-sign-out-alt"></i>
        &nbsp;
        <span>Salir</span>
      </button>
    </div>
  );
};
