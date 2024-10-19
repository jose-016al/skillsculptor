import React, { useState } from 'react';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { Global } from '../../../helpers/Global';
import { ApiRequests } from '../../../helpers/ApiRequests';
import { useAuth } from '../../../hooks/useAuth';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert } from '../../layout/Alert';
import signinimage from '../../../assets/img/undraw_welcome_cats_thqn.svg'

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("El correo electrónico no es válido")
        .required("El correo electrónico es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria")
});

export const Login = () => {
    const { setAuth, loading } = useAuth();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState("");
    const [statusError, setStatusError] = useState("");

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema,
        onSubmit: values => {
            signin(values);
        }
    });

    const signin = async (form) => {
        setServerError("");
        setStatusError("");
        let user = form;
        try {
            const { data, status } = await ApiRequests(`${Global.url}login`, "POST", user);
            if (status === 200) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                setAuth(data.user);
                navigate(`/profiles/${data.user.id}`);
            } else if (status === 401) {
                setServerError("Contraseña incorrecta");
                setStatusError("error");
            } else if (status === 404) {
                setServerError("No existe ninguna cuenta con este email");
                setStatusError("error");
            }
        } catch (error) {
            setServerError("Error en la solicitud, intenta más tarde.");
            setStatusError("warning");
        }
    };

    return (
        <div id='loginlayout' className="flex flex-col md:flex-row items-center h-screen px-3">
            <div className="md:w-1/2 w-full ">
                <form id='forms' className="py-4 px-5 max-w-sm mx-auto border border-gray-100 rounded-lg bg-gray-100 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700" onSubmit={formik.handleSubmit}>
                    <h1 className="text-center text-2xl font-semibold mb-4">Login</h1>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="********"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        {formik.errors.password && formik.touched.password ? formik.errors.password : ""}
                    </div>
                    <div>
                        {serverError && <Alert message={serverError} status={statusError} />}
                    </div>
                    <div id='navlogin'>
                        <NavLink
                            className="text-blue-700 rounded-lg w-full sm:w-auto px-5 py-2.5 text-center"
                            to="/register">
                            Crear cuenta
                        </NavLink>

                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Identificate
                        </button>
                    </div>

                </form>
            </div>

            <div  className="md:w-1/2 w-full hidden md:flex justify-center items-center">
                <img
                    src={signinimage}
                    className="max-w-full h-auto md:max-w-lg lg:max-w-xl xl:max-w-2xl object-contain"
                    alt="login-image"
                />
            </div>
        </div>
    );
};
