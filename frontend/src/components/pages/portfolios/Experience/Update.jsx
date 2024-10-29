import React, { useState } from 'react';
import { Button, Modal } from "flowbite-react";
import { Global } from '../../../../helpers/Global';
import { ApiRequests } from '../../../../helpers/ApiRequests';
import { useAuth } from '../../../../hooks/useAuth';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert } from '../../../layout/Alert';
import { Dates } from '../../../layout/Dates';
import { useTheme } from '../../../../hooks/useTheme';

export const Update = ({ experience }) => {

    const [openModal, setOpenModal] = useState(false);
    const [serverError, setServerError] = useState("");
    const [statusError, setStatusError] = useState("");
    const [loading, setLoading] = useState(false);
    const { auth, setAuth } = useAuth();
    const { primaryColor } = useTheme();

    const formik = useFormik({
        initialValues: {
            title: "",
            date: ""
        },
        onSubmit: values => {
            setLoading(true);
            edit(values);
        }
    });

    const edit = async (form) => {
        setServerError("");
        setStatusError("");

        let dataSave = {
            title: form.title || experience.title,
            date: form.date || experience.date,
            company: form.company || experience.company,
            page: form.page || experience.page,
        };

        try {
            const token = localStorage.getItem('token');
            const { data, status } = await ApiRequests(`${Global.url}${experience.id}/edit/experience`, "PUT", dataSave, false, token);
            if (status === 200) {
                const updatedUser = {
                    ...auth,
                    portfolio: {
                        ...auth.portfolio,
                        experience: auth.portfolio.experience.map(exp =>
                            exp.id === experience.id ? { ...exp, ...data } : exp
                        )
                    }
                };
                setAuth(updatedUser);

                setServerError("Experiencia actualizada correctamente");
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
        <>
            <button
                className={`text-white ${primaryColor.bg} ${primaryColor.hover} focus:ring-4 focus:outline-none ${primaryColor.focusRing} font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
                onClick={() => setOpenModal(true)}>
                Editar
            </button>

            <Modal show={openModal} size="2xl" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <form className="py-4 px-5" onSubmit={formik.handleSubmit}>
                        <h1 className="text-center text-2xl font-semibold mb-4">Editar experiencia</h1>
                        {loading &&
                            <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-800 bg-opacity-50 backdrop-blur-sm z-10">
                                <div className={`loader border-8 ${primaryColor.border}`}></div>
                                <p className='text-center'>Reescribiendo la historia... ✍️</p>
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
                                        defaultValue={experience.title}
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
                                        defaultValue={experience.company}
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
                                        defaultValue={experience.page}
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
                                Actualizar
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};
