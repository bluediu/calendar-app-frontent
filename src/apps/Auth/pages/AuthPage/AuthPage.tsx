/* Components */
import { Login, SignIn } from '../../components';

/* Hooks */
import { useAppSelector } from '../../../../hooks';

import './AuthPage.css';

export const AuthPage = () => {
  const { isPending } = useAppSelector((state) => state.auth);

  return (
    <main className="container login-container">
      <article className="row">
        <section className="col-md-6 login-form-1">
          <Login isPending={isPending} />
        </section>

        <section className="col-md-6 login-form-2">
          <SignIn isPending={isPending} />
        </section>
      </article>
    </main>
  );
};
