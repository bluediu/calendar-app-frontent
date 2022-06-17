import { useFormik } from 'formik';
import * as Yup from 'yup';

import { startRegister } from '../../../context/auth/auth.actions';

import { useAppDispatch } from '../../../hooks/redux';

export function Register() {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[a-zA-Z0-9-]*$/, 'Username cannot have blank')
        .required('Name is required'),
      email: Yup.string()
        .email('Email is not valid')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .oneOf(
          [Yup.ref('repeatPassword')],
          'Passwords are not the same'
        ),
      repeatPassword: Yup.string()
        .required('Password is required')
        .oneOf(
          [Yup.ref('password')],
          'Passwords are not the same'
        ),
    }),
    onSubmit: async ({ email, name, password }) => {
      dispatch(startRegister({ email, password, name }));
    },
  });

  return (
    <>
      <h3>Sign In</h3>

      <form onSubmit={formik.handleSubmit}>
        <div className="form-group mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Your name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && (
            <span className="text-danger">
              {formik.errors.name}
            </span>
          )}
        </div>
        <div className="form-group mb-2">
          <input
            type="email"
            className="form-control"
            placeholder="Your email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && (
            <span className="text-danger">
              {formik.errors.email}
            </span>
          )}
        </div>
        <div className="form-group mb-2">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && (
            <span className="text-danger">
              {formik.errors.password}
            </span>
          )}
        </div>

        <div className="form-group mb-2">
          <input
            type="password"
            className="form-control"
            placeholder="Repead your password"
            name="repeatPassword"
            value={formik.values.repeatPassword}
            onChange={formik.handleChange}
          />
          {formik.errors.repeatPassword && (
            <span className="text-danger">
              {formik.errors.repeatPassword}
            </span>
          )}
        </div>

        <div className="d-grid gap-2">
          <input
            type="submit"
            className="btnSubmit"
            value="Create account"
          />
        </div>
      </form>
    </>
  );
}

function initialValues() {
  return {
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  };
}
