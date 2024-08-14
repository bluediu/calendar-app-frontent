/* Components */
import { Login, SignIn } from '../../components';

import './AuthPage.css';

export const AuthPage = () => {
  return (
    <main className="container login-container">
      <article className="row">
        <section className="col-md-6 login-form-1">
          <Login />
        </section>

        <section className="col-md-6 login-form-2">
          <SignIn />
        </section>
      </article>
    </main>
  );
};
