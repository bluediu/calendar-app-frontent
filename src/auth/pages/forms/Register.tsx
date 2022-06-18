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
        .matches(/^[a-zA-Z0-9-]*$/, 'Formato no valido')
        .required('El nombre es necesario'),
      email: Yup.string()
        .email('El correo no es valido')
        .required('El correo es necesario'),
      password: Yup.string()
        .required('La contraseña es necesaria')
        .oneOf(
          [Yup.ref('repeatPassword')],
          'Las contraseñas no son iguales'
        ),
      repeatPassword: Yup.string()
        .required('La contraseña es necesaria')
        .oneOf(
          [Yup.ref('password')],
          'Las contraseña no son iguales'
        ),
    }),
    onSubmit: async ({ email, name, password }) => {
      dispatch(startRegister({ email, password, name }));
    },
  });

  return (
    <>
      <h3>Regístrate</h3>

      <form onSubmit={formik.handleSubmit}>
        <div className="form-group mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre"
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

        <div className="form-group mb-2">
          <input
            type="password"
            className="form-control"
            placeholder="Repite tu contraseña"
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
            value="Crear una cuenta"
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
