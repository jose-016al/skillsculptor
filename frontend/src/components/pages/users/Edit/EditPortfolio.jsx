import React, { useEffect, useState } from 'react'
import { Sidebar } from './Sidebar'
import { Global } from '../../../../helpers/Global';
import { ApiRequests } from '../../../../helpers/ApiRequests';
import { useAuth } from '../../../../hooks/useAuth';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert } from '../../../layout/Alert';
import { useIcons } from '../../../../hooks/useIcons';
import { useTheme } from '../../../../hooks/useTheme';

export const EditPortfolio = () => {

  const [serverError, setServerError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const iconsMap = useIcons();
  const { auth, setAuth } = useAuth();
  const { primaryColor } = useTheme();

  useEffect(() => {
    setSelectedSkills(auth.portfolio.stack);
  }, []);

  const formik = useFormik({
    initialValues: {
      position: "",
      description: ""
    },
    onSubmit: values => {
      setLoading(true);
      edit(values);
    }
  });

  const edit = async (form) => {
    setServerError("");
    setStatusError("");

    let portfolio = {
      position: form.position || auth.portfolio.position,
      description: form.description || auth.portfolio.description,
      stack: selectedSkills
    };

    try {
      const token = localStorage.getItem('token');
      const { data, status } = await ApiRequests(`${Global.url}${auth.portfolio.id}/edit/portfolio`, "PUT", portfolio, false, token);
      if (status === 200) {
        const updatedUser = {
          ...auth,
          portfolio: {
            ...auth.portfolio,
            ...data
          }
        };
        setAuth(updatedUser);

        setServerError("Portfolio actualizado");
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
      console.log(error);
    }
  };

  const handleSkillChange = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <div className='md:container mx-3 mb-10 md:mx-auto flex flex-col md:flex-row mt-20 border border-gray-300 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900'>
      <div>
        <Sidebar />
      </div>
      <div className='w-full'>
        <form className="relative py-4 px-5" onSubmit={formik.handleSubmit}>
          <h1 className="text-center text-2xl font-semibold mb-4">Editar portfolio</h1>
          {loading &&
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-800 bg-opacity-50 backdrop-blur-sm z-10">
              <div className={`loader border-8 ${primaryColor.border}`}></div>
              <p className='text-center'>Reescribiendo la historia... ✍️</p>
            </div>
          }
          <div className='w-full'>
            <div>
              <label htmlFor="position" className="block mb-2 md:my-2 text-sm font-medium text-gray-900 dark:text-white">
                Cargo
              </label>
              <input
                type="text"
                name="position"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg ${primaryColor.focusRing} ${primaryColor.focusBorder} block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
                defaultValue={auth.portfolio.position}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              {formik.errors.position && formik.touched.position ? formik.errors.position : ""}
            </div>
          </div>
          <div className='w-full'>
            <div>
              <label htmlFor="description" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">
                Descripción
              </label>
              <textarea
                type="email"
                name="description"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg ${primaryColor.focusRing} ${primaryColor.focusBorder} block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
                defaultValue={auth.portfolio.description}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              {formik.errors.description && formik.touched.description ? formik.errors.description : ""}
            </div>
          </div>
          <div className='flex flex-wrap justify-center my-5'>
            {Object.entries(iconsMap).map(([skill, icon], index) => (
              <div key={index} className="p-2">
                                <input
                  type="checkbox"
                  className="hidden"
                  checked={selectedSkills.includes(skill)}
                  readOnly
                />


                <div
                  className={`flex flex-col items-center cursor-pointer`}
                  onClick={() => handleSkillChange(skill)}
                >
                  <div className={`text-5xl ${selectedSkills.includes(skill) ? primaryColor.text : 'text-gray-500 dark:text-gray-600'}`}>
                    {icon}
                  </div>
                  <span>{skill}</span>
                </div>
              </div>

            ))}
          </div>
          <div>
            {serverError && <Alert message={serverError} status={statusError} />}
          </div>
          <div className='mt-5'>
            <button
              type="submit"
              className={`text-white ${primaryColor.bg} ${primaryColor.hover}  focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}>
              Actualizar
            </button>
          </div>
        </form>
      </div >
    </div >
  )
}
