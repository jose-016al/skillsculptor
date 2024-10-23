import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Global } from '../../../helpers/Global';
import { ApiRequests } from '../../../helpers/ApiRequests';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert } from '../../layout/Alert';
import illustration from '../../../assets/img/undraw_account_re_o7id.svg'

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Este campo es obligatorio"),
  last_name: Yup.string()
    .required("Este campo es obligatorio"),
  email: Yup.string()
    .email("Email no válido")
    .required("Este campo es obligatorio"),
  emailrepeat: Yup.string()
    .oneOf([Yup.ref('email'), null], 'El email no coincide')
    .required("Este campo es obligatorio"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("Este campo es obligatorio"),
  passwordrepeat: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required("Este campo es obligatorio")
});

export const Register = () => {

  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      last_name: "",
      email: "",
      emailrepeat: "",
      passwordrepeat: "",
      password: ""
    },
    validationSchema,
    onSubmit: values => {
      setLoading(true);
      signup(values);
    }
  });

  const signup = async (form) => {
    setServerError("");
    setStatusError("");
    let user = form;
    try {
      const { status } = await ApiRequests(`${Global.url}register`, "POST", user);
      if (status === 201) {
        navigate('/login');
      } else if (status === 400) {
        setServerError("El usuario ya existe");
        setStatusError("error");
        setLoading(false);
      }
    } catch (error) {
      setServerError("Error en la solicitud, intenta más tarde.");
      setStatusError("warning");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row items-center lg:h-screen px-3 mt-20 lg:mt-0">
      <div className="md:w-1/2 w-full hidden md:flex justify-center items-center px-5 mt-5 lg:mt-0">
        <img
          src={illustration}
          className="max-w-full h-auto md:max-w-lg lg:max-w-md xl:max-w-2xl object-contain"
          alt="login-image"
        />
      </div>

      <div className="md:w-1/2 w-full ">
        <form id='forms' className="relative py-4 px-5 max-w-lg mx-auto border border-gray-100 rounded-lg bg-gray-100 md:bg-white dark:bg-gray-800 dark:border-gray-700" onSubmit={formik.handleSubmit}>
          <h1 className="text-center text-2xl font-semibold mb-4">Registro</h1>
          {loading &&
            <div className="absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 backdrop-blur-sm z-10">
              <div className="loader"></div>
            </div>
          }
          <div className='flex flex-col md:flex-row md:space-x-4'>
            <div className='md:w-1/2'>
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Peter"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                {formik.errors.name && formik.touched.name ? formik.errors.name : ""}
              </div>
            </div>
            <div className='md:w-1/2'>
              <div>
                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Apellidos
                </label>
                <input
                  type="text"
                  name="last_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Anthony"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                {formik.errors.last_name && formik.touched.last_name ? formik.errors.last_name : ""}
              </div>
            </div>
          </div>
          <div className='flex flex-col md:flex-row md:space-x-4'>
            <div className='md:w-1/2'>
              <div>
                <label htmlFor="email" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">
                  Correo electronico
                </label>
                <input
                  type="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="peter@anthony.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                {formik.errors.email && formik.touched.email ? formik.errors.email : ""}
              </div>
            </div>
            <div className='md:w-1/2'>
              <div>
                <label htmlFor="email" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">
                  Repetir correo electronico
                </label>
                <input
                  type="email"
                  name="emailrepeat"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="peter@anthony.com"
                  value={formik.values.emailrepeat}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                {formik.errors.emailrepeat && formik.touched.emailrepeat ? formik.errors.emailrepeat : ""}
              </div>
            </div>
          </div>
          <div className='flex flex-col md:flex-row md:space-x-4'>
            <div className='md:w-1/2'>
              <div>
                <label htmlFor="password" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="********"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                {formik.errors.password && formik.touched.password ? formik.errors.password : ""}
              </div>
            </div>
            <div className='md:w-1/2'>
              <div>
                <label htmlFor="passwordrepeat" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">
                  Repetir contraseña
                </label>
                <input
                  type="password"
                  name="passwordrepeat"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="********"
                  value={formik.values.passwordrepeat}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                {formik.errors.passwordrepeat && formik.touched.passwordrepeat ? formik.errors.passwordrepeat : ""}
              </div>
            </div>
          </div>
          <div>
            {serverError && <Alert message={serverError} status={statusError} />}
          </div>
          <div className='mt-5'>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Crear cuenta
            </button>
          </div>
        </form>
      </div>


    </div>
  );
};
