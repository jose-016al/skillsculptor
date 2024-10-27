import React, { useEffect, useState } from 'react'
import { ThemeMode } from '../../../layout/ThemeMode'
import { Sidebar } from './Sidebar'
import { Global } from '../../../../helpers/Global';
import { ApiRequests } from '../../../../helpers/ApiRequests';
import { useAuth } from '../../../../hooks/useAuth';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert } from '../../../layout/Alert';
import { useNavigate } from 'react-router-dom';
import avatar from '../../../../assets/img/default.png';

const FILE_SIZE = 1024 * 1024; // 1024 KB
const SUPPORTED_FORMATS = ["image/jpeg", "image/png"];

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email no válido"),
  emailrepeat: Yup.string()
    .oneOf([Yup.ref('email'), null], 'El email no coincide'),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
  passwordrepeat: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir'),
  image: Yup.mixed()
    .nullable()
    .test(
      "fileSize",
      "El archivo es demasiado grande. El tamaño máximo es 1024 KB",
      (value) => !value || (value && value.size <= FILE_SIZE)
    )
    .test(
      "fileFormat",
      "Solo se permiten archivos de tipo JPEG o PNG",
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
    )
});

export const EditPortfolio = () => {

  const [serverError, setServerError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [loading, setLoading] = useState(false);
  const { auth, setAuth } = useAuth();

  const formik = useFormik({
    initialValues: {
      name: "",
      last_name: "",
      email: "",
      emailrepeat: "",
      passwordrepeat: "",
      password: "",
      image: null
    },
    validationSchema,
    onSubmit: values => {
      setLoading(true);
      edit(values);
    }
  });

  const edit = async (form) => {
    setServerError("");
    setStatusError("");

    let user = {
      name: form.name || auth.name,
      last_name: form.last_name || auth.last_name,
      email: form.email || auth.email,
      password: form.password || "", // Si la contraseña está vacía, no se envía
    };

    try {
      const token = localStorage.getItem('token');
      const { data, status } = await ApiRequests(`${Global.url}${auth.id}/edit/user`, "PUT", user, false, token);
      if (status === 200) {
        const updatedUser = { ...auth, ...data };
        setAuth(updatedUser);

        /* Subir imagen */
        const fileInput = document.querySelector("#file");
        if (status === 200 && fileInput.files[0]) {
          const formData = new FormData();
          formData.append("image", fileInput.files[0]);
          const { data, status } = await ApiRequests(`${Global.url}${auth.id}/upload`, "POST", formData, true, token);
          if (status === 201) {
            const updatedUser = { ...auth, ...data };
            setAuth(updatedUser);
          } else {
            setServerError("No se ha podido subir la imagen");
            setStatusError("error");
          }
        }

        setServerError("Usuario actualizado");
        setStatusError("success");
        setLoading(false);
      } else if (status === 400) {
        setServerError("Este email ya esta en uso");
        setStatusError("error");
        setLoading(false);
      } else if (status === 403) {
        setServerError("No tienes permisos para editar este usuario");
        setStatusError("error");
        setLoading(false);
      }
    } catch (error) {
      setServerError("Error en la solicitud, intenta más tarde");
      setStatusError("warning");
      setLoading(false);
      console.log(error);
    }
  };

  const handleImageChange = (event) => {
    formik.setFieldValue("image", event.currentTarget.files[0]);
  };

  return (
    <div className='md:container mx-3 md:mx-auto flex flex-col md:flex-row mt-20 border border-gray-300 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900'>
      <div>
        <Sidebar />
      </div>
      <div className='w-full'>
        <form className="relative py-4 px-5" onSubmit={formik.handleSubmit}>
          <h1 className="text-center text-2xl font-semibold mb-4">Editar portfolio</h1>
          {loading &&
            <div className="absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 backdrop-blur-sm z-10">
              <div className="loader"></div>
            </div>
          }
          <div className='flex flex-col md:flex-row md:space-x-4'>
            <div className='md:w-1/2'>
              <div>
                <ThemeMode />
              </div>
              <div>
                <label className="block my-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="image">
                  Avatar
                </label>
                <input
                  type="file"
                  name='image'
                  id='file'
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleImageChange}
                />
              </div>
              <div>
                {formik.errors.image && formik.touched.image ? formik.errors.image : ""}
              </div>
            </div>
            <div className='md:w-1/2'>
              <div className='w-2/5 h-full mx-auto mt-5 md:mt-0'>
                {auth.image == 'default.png' && <img className="md:max-w-md w-full h-full object-cover rounded-full" src={avatar} alt="Bordered avatar" />}
                {auth.image != 'default.png' && <img className="md:max-w-md w-full h-full object-cover rounded-full" src={`${Global.url}avatar/${auth.image}`} alt="Bordered avatar" />}
              </div>
            </div>
          </div>
          <div className='flex flex-col md:flex-row md:space-x-4'>
            <div className='md:w-1/2'>
              <div>
                <label htmlFor="name" className="block mb-2 md:my-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={auth.name}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                {formik.errors.name && formik.touched.name ? formik.errors.name : ""}
              </div>
            </div>
            <div className='md:w-1/2'>
              <div>
                <label htmlFor="last_name" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">
                  Apellidos
                </label>
                <input
                  type="text"
                  name="last_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={auth.last_name}
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
                  defaultValue={auth.email}
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
                  defaultValue={auth.email}
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
              Actualizar
            </button>
          </div>
        </form>
      </div >
    </div >
  )
}
