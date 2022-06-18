import { useFormik } from 'formik';
import * as Yup from 'yup';

import { startLogin } from '../../../context/auth/auth.actions';

import { useAppDispatch } from '../../../hooks/redux';

export const Login = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      email: Yup.string()
        .email('El correo es invalido')
        .required('El correo es necesario'),
      password: Yup.string().required(
        'La contraseña es necesario'
      ),
    }),
    onSubmit: async ({ email, password }) => {
      dispatch(startLogin({ email, password }));
    },
  });

  return (
    <>
      <h3>Iniciar sección</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Correo electrónico"
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
            placeholder="Contraseña"
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

        <div className="d-grid gap-2">
          <input
            type="submit"
            className="btnSubmit"
            value="Iniciar sección"
          />
        </div>
      </form>
    </>
  );
};

function initialValues() {
  return {
    email: '',
    password: '',
  };
}
