import { Login, Register } from './forms';

import './AuthPage.css';

export const AuthPage = () => {
  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <Login />
        </div>

        <div className="col-md-6 login-form-2">
          <Register />
        </div>
      </div>
    </div>
  );
};
