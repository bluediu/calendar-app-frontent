/* Forms */
import * as Yup from 'yup';
import { useFormik } from 'formik';

/* Context */
import { startLogin } from '../context';

/* Hooks */
import { useAppDispatch } from '../../../hooks';

export const Login = () => {
  const dispatch = useAppDispatch();

  const { values, errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      password: Yup.string().required('Password is required').min(6),
    }),
    onSubmit: ({ email, password }) => {
      dispatch(startLogin({ email, password }));
    },
  });

  return (
    <article>
      <h3>Log in</h3>

      <form onSubmit={handleSubmit}>
        <section className="form-group mb-2">
          <input
            type="email"
            className={`form-control ${errors.email && 'is-invalid'}`}
            placeholder="Email address"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <span className="text-danger">{errors.email}</span>}
        </section>

        <section className="form-group mb-2">
          <input
            type="password"
            className={`form-control ${errors.password && 'is-invalid'}`}
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && (
            <span className="text-danger">{errors.password}</span>
          )}
        </section>

        <div className="d-grid gap-2">
          <button type="submit" className="btn-submit mx-0">
            Next
          </button>
        </div>
      </form>
    </article>
  );
};
