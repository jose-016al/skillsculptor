import React, { useState } from 'react';
import { Button, Modal } from "flowbite-react";
import { ThemeMode } from '../../../layout/ThemeMode';
import { Global } from '../../../../helpers/Global';
import { ApiRequests } from '../../../../helpers/ApiRequests';
import { useAuth } from '../../../../hooks/useAuth';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert } from '../../../layout/Alert';

const FILE_SIZE = 1024 * 1024; // 1024 KB
const SUPPORTED_FORMATS = ["image/jpeg", "image/png"];

const validationSchema = Yup.object().shape({
    demo: Yup.string().url("Debe ser un enlace válido").nullable(),
    github: Yup.string().url("Debe ser un enlace válido").nullable(),
    image: Yup.mixed()
        .nullable()
        .test("fileSize", "El archivo es demasiado grande. El tamaño máximo es 1024 KB", (value) => !value || (value && value.size <= FILE_SIZE))
        .test("fileFormat", "Solo se permiten archivos de tipo JPEG o PNG", (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))),
});

export const Update = ({ project }) => {

    const [openModal, setOpenModal] = useState(false);
    const [serverError, setServerError] = useState("");
    const [statusError, setStatusError] = useState("");
    const [loading, setLoading] = useState(false);
    const { auth, setAuth } = useAuth();

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            demo: "",
            github: "",
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

        let dataSave = {
            title: form.title || project.title,
            description: form.description || project.description,
            demo: form.demo || project.demo,
            github: form.github || project.github,
        };

        try {
            const token = localStorage.getItem('token');
            const { data, status } = await ApiRequests(`${Global.url}${project.id}/edit/project`, "PUT", dataSave, false, token);
            if (status === 200) {
                const fileInput = document.querySelector("#file2");
                console.log(fileInput.files[0]);
                if (fileInput.files[0]) {
                    const formData = new FormData();
                    formData.append("image", fileInput.files[0]);
                    const { data, status } = await ApiRequests(`${Global.url}project/${project.id}/upload`, "POST", formData, true, token);
                    if (status === 201) {
                        const updatedUser = {
                            ...auth,
                            portfolio: {
                                ...auth.portfolio,
                                project: auth.portfolio.project.map(proj =>
                                    proj.id === project.id ? { ...proj, ...data } : proj
                                ) 
                            }
                        };
                        setAuth(updatedUser);
                    } else {
                        setServerError("No se ha podido subir la imagen");
                        setStatusError("error");
                    }
                } else {
                    const updatedUser = {
                        ...auth,
                        portfolio: {
                            ...auth.portfolio,
                            project: auth.portfolio.project.map(proj =>
                                proj.id === project.id ? { ...proj, ...data } : proj
                            ) 
                        }
                    };
                    setAuth(updatedUser);
                }

                setServerError("Proyecto añadido correctamente");
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

    const handleImageChange = (event) => {
        formik.setFieldValue("image", event.currentTarget.files[0]);
    };

    return (
        <>
            <Button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg w-full sm:w-auto p-0 m-0 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => setOpenModal(true)}>
                Editar
            </Button>

            <Modal show={openModal} size="4xl" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <form className="py-4 px-5" onSubmit={formik.handleSubmit}>
                        <h1 className="text-center text-2xl font-semibold mb-4">Editar proyecto</h1>
                        {loading &&
                            <div className="absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 backdrop-blur-sm z-10">
                                <div className="loader"></div>
                            </div>
                        }
                        <div className='flex flex-col md:flex-row md:space-x-4'>
                            <div className='md:w-1/2'>
                                <div>
                                    <label htmlFor="title" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Titulo
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        defaultValue={project.title}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                <div>
                                    {formik.errors.title && formik.touched.title ? formik.errors.title : ""}
                                </div>
                            </div>
                            <div className='md:w-1/2'>
                                <div>
                                    <label htmlFor="image" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Subir imagen
                                    </label>
                                    <input
                                        type="file"
                                        name='image'
                                        id='file2'
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={handleImageChange}
                                    />
                                </div>
                                <div>
                                    {formik.errors.image && formik.touched.image ? formik.errors.image : ""}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row md:space-x-4'>
                            <div className='md:w-1/2'>
                                <div>
                                    <label htmlFor="demo" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Página demo
                                    </label>
                                    <input
                                        type="text"
                                        name="demo"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        defaultValue={project.demo}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                <div>
                                    {formik.errors.demo && formik.touched.demo ? formik.errors.demo : ""}
                                </div>
                            </div>
                            <div className='md:w-1/2'>
                                <div>
                                    <label htmlFor="github" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Enlace repositorio GitHub
                                    </label>
                                    <input
                                        type="text"
                                        name="github"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        defaultValue={project.github}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                <div>
                                    {formik.errors.github && formik.touched.github ? formik.errors.github : ""}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row'>
                            <div className='w-full'>
                                <div>
                                    <label htmlFor="description" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Descripción
                                    </label>
                                    <textarea
                                        name="description"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        defaultValue={project.description}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                <div>
                                    {formik.errors.password && formik.touched.password ? formik.errors.password : ""}
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
                </Modal.Body>
            </Modal>
        </>
    );
};
