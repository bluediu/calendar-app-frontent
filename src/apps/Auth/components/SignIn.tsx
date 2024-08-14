import * as Yup from 'yup';

/* Context */
import { startSignIn } from '../context';

/* Hooks */
import { useFormik } from 'formik';
import { useAppDispatch } from '../../../hooks';

export const SignIn = () => {
  const dispatch = useAppDispatch();

  const { values, errors, handleSubmit, handleChange } = useFormik({
    initialValues: { name: '', email: '', password: '', repeatPassword: '' },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[a-zA-Z0-9-]*$/, 'Name can only contain letters and numbers')
        .required('Name is required'),
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(6)
        .oneOf([Yup.ref('repeatPassword')], 'Passwords are not the same'),
      repeatPassword: Yup.string()
        .required('Password is required')
        .min(6)
        .oneOf([Yup.ref('password')], 'Passwords are not the same'),
    }),
    onSubmit: (values) => {
      dispatch(
        startSignIn({
          name: values.name,
          email: values.email,
          password: values.password,
        })
      );
    },
  });

  return (
    <article>
      <h3>Sign in</h3>

      <form onSubmit={handleSubmit}>
        <section className="form-group mb-2">
          <input
            type="text"
            className={`form-control ${errors.name && 'is-invalid'}`}
            placeholder="Name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && <span className="text-danger">{errors.name}</span>}
        </section>

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

        <section className="form-group mb-2">
          <input
            type="password"
            className={`form-control ${errors.repeatPassword && 'is-invalid'}`}
            placeholder="Repeat password"
            name="repeatPassword"
            value={values.repeatPassword}
            onChange={handleChange}
          />
          {errors.repeatPassword && (
            <span className="text-danger">{errors.repeatPassword}</span>
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
