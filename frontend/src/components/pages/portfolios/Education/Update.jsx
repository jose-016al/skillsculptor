import React, { useState } from 'react';
import { Button, Modal } from "flowbite-react";
import { ThemeMode } from '../../../layout/ThemeMode';
import { Global } from '../../../../helpers/Global';
import { ApiRequests } from '../../../../helpers/ApiRequests';
import { useAuth } from '../../../../hooks/useAuth';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert } from '../../../layout/Alert';
import { Datepicker } from 'flowbite-react';

export const Update = ({ education }) => {

    const [openModal, setOpenModal] = useState(false);
    const [serverError, setServerError] = useState("");
    const [statusError, setStatusError] = useState("");
    const [loading, setLoading] = useState(false);
    const { auth, setAuth } = useAuth();

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
            title: form.title || education.title,
            date: form.date || education.date,
        };

        try {
            const token = localStorage.getItem('token');
            const { data, status } = await ApiRequests(`${Global.url}${education.id}/edit/education`, "PUT", dataSave, false, token);
            if (status === 200) {
                const updatedUser = {
                    ...auth,
                    portfolio: {
                        ...auth.portfolio,
                        education: auth.portfolio.education.map(edu =>
                            edu.id === education.id ? { ...edu, ...data } : edu
                        )
                    }
                };
                setAuth(updatedUser);

                setServerError("Formaciión actualizada correctamente");
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

    // Logica de la funcion de fecha
    const now = new Date();
    const minDate = new Date(now.getFullYear() - 70, now.getMonth(), now.getDate()); // 70 años atrás

    const [isChecked, setIsChecked] = useState(false);

    const handleDateChange = (value) => {
        const year = value ? value.getFullYear() : null; // Extraer solo el año
        formik.setFieldValue("date", year); // Actualizar el valor de Formik
    };

    const handleCheckboxChange = () => {
        setIsChecked((prev) => !prev);
        if (!isChecked) {
            formik.setFieldValue("date", "Actualmente");
        }
    };

    return (
        <>
            <Button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg w-full sm:w-auto p-0 m-0 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => setOpenModal(true)}>
                Editar
            </Button>

            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <form className="py-4 px-5" onSubmit={formik.handleSubmit}>
                        <h1 className="text-center text-2xl font-semibold mb-4">Editar formación</h1>
                        {loading &&
                            <div className="absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 backdrop-blur-sm z-10">
                                <div className="loader"></div>
                            </div>
                        }
                        <div className='flex flex-col'>
                            <div>
                                <div>
                                    <label htmlFor="title" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Titulo
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        defaultValue={education.title}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                <div>
                                    {formik.errors.title && formik.touched.title ? formik.errors.title : ""}
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="date" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Fecha de finalización
                                    </label>
                                    <Datepicker
                                        language="es-ES"
                                        minDate={minDate}
                                        maxDate={now}
                                        selected={isChecked ? now : formik.values.date} // Selecciona según el estado del checkbox
                                        onChange={isChecked ? () => handleDateChange(now) : handleDateChange} // Actualiza el valor de date en Formik
                                        disabled={isChecked} // Deshabilita el Datepicker si el checkbox está marcado
                                    />
                                    <div className='flex space-x-2 items-center'>
                                        <input
                                            type="checkbox"
                                            name='date'
                                            checked={isChecked}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label htmlFor="date" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Actualmente
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    {formik.errors.date && formik.touched.date ? formik.errors.date : ""}
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
                                Añadir
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};
