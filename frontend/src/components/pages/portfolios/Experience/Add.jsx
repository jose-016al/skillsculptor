import React, { useEffect, useState } from 'react'
import { Global } from '../../../../helpers/Global';
import { ApiRequests } from '../../../../helpers/ApiRequests';
import { useAuth } from '../../../../hooks/useAuth';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert } from '../../../layout/Alert';
import { Datepicker } from 'flowbite-react';
import { Dates } from '../../../layout/Dates';
import { useTheme } from '../../../../hooks/useTheme';

const validationSchema = Yup.object().shape({
  title: Yup.string().required("El título es obligatorio"),
  date: Yup.string().required("Las fechas son obligatorios"),
  company: Yup.string().required("La empresa es obligatoria"),
  page: Yup.string().url("Debe ser un enlace válido").nullable(),
});

export const Add = () => {

  const [serverError, setServerError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [loading, setLoading] = useState(false);
  const { auth, setAuth } = useAuth();
  const { primaryColor } = useTheme();

  useEffect(() => {
    if (statusError === "success") {
      formik.resetForm(); // Reinicia el formulario
    }
  }, [statusError]);

  const formik = useFormik({
    initialValues: {
      title: "",
      date: "",
      company: "",
      page: ""
    },
    validationSchema,
    onSubmit: values => {
      setLoading(true);
      add(values);
    }
  });

  const add = async (form) => {
    setServerError("");
    setStatusError("");
    let experience = form;
    console.log(experience);
    try {
      const token = localStorage.getItem('token');
      const { data, status } = await ApiRequests(`${Global.url}${auth.portfolio.id}/experience`, "POST", experience, false, token);
      if (status === 201) {
        const updatedUser = {
          ...auth,
          portfolio: {
            ...auth.portfolio,
            experience: [...auth.portfolio.experience, data] // Añadir el nuevo proyecto al array
          }
        };
        setAuth(updatedUser);

        setServerError("Experiencia añadida correctamente");
        setStatusError("success");
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
    }
  };

  return (
    <div className='w-full'>
      <form className="relative py-4 px-5" onSubmit={formik.handleSubmit}>
        <h1 className="text-center text-2xl font-semibold mb-4">Añadir experiencia</h1>
        {loading &&
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-800 bg-opacity-50 backdrop-blur-sm z-10">
            <div className={`loader border-8 ${primaryColor.border}`}></div>
            <p className='text-center'>Subiendo... casi listos. ⏳</p>
          </div>
        }
        <div className='flex flex-col md:flex-row'>
          <div className='w-full'>
            <div>
              <label htmlFor="title" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">
                Titulo
              </label>
              <input
                type="text"
                name="title"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg ${primaryColor.focusRing} ${primaryColor.border} block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
                value={formik.values.title}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              {formik.errors.title && formik.touched.title ? formik.errors.title : ""}
            </div>
          </div>
        </div>
        <div className='flex flex-col md:flex-row md:space-x-4'>
          <div className='md:w-1/2'>
            <div>
              <label htmlFor="company" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">
                Empresa
              </label>
              <input
                type="text"
                name="company"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg ${primaryColor.focusRing} ${primaryColor.border} block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
                value={formik.values.company}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              {formik.errors.company && formik.touched.company ? formik.errors.company : ""}
            </div>
          </div>
          <div className='md:w-1/2'>
            <div>
              <label htmlFor="page" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">
                Página de la empresa
              </label>
              <input
                type="text"
                name="page"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg ${primaryColor.focusRing} ${primaryColor.border} block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
                value={formik.values.page}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              {formik.errors.page && formik.touched.page ? formik.errors.page : ""}
            </div>
          </div>
        </div>
        <Dates setDate={(date) => formik.setFieldValue("date", date)} rangeDatePicker={true} />
        <div>
          {formik.errors.date && formik.touched.date ? formik.errors.date : ""}
        </div>
        <div>
          {serverError && <Alert message={serverError} status={statusError} />}
        </div>
        <div className='mt-5'>
          <button
            type="submit"
            className={`text-white ${primaryColor.bg} ${primaryColor.hover} focus:ring-4 focus:outline-none ${primaryColor.focusRing} font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}>
            Añadir
          </button>
        </div>
      </form>
    </div>
  )
}