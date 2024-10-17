import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Global } from '../../../helpers/Global';
import { ApiRequests } from '../../../helpers/ApiRequests';
import { useAuth } from '../../../hooks/useAuth';
import { useFormik } from "formik";
import * as Yup from "yup";

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

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema,
        onSubmit: values => {
            loginUser(values)
        }
    });

    const loginUser = async (form) => {
        setServerError("");
        let user = form;
        console.log(user);
        try {
            const { data, status } = await ApiRequests(`${Global.url}login`, "POST", user);
            // Verifica si la respuesta es exitosa
            if (status === 200) {
                console.log(data);
                /* Persistir datos en localStorage */
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                /* Setear datos en el auth */
                setAuth(data.user);
                /* Redirrecion */
                // navigate(`/profiles/${data.user.id}`);
            } else if (status === 401) {
                setServerError("Contraseña incorrecta");
            } else if (status === 404) {
                setServerError("No existe ninguna cuenta con este email");
            }
        } catch (error) {
            console.error("Error en la solicitud", error);
            setServerError("Error en la solicitud, intenta más tarde.");
        }
    }
    
    return (
        <>
            <div>
                <h1 className="text-6xl font-bold text-center my-4">Login</h1>
                <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo electronico</label>
                        <input type="email"name='email' id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="mail@gmail.com"
                            value={formik.values.email}
                            onChange={formik.handleChange} />
                    </div>
                    <div>
                        {formik.errors.email && formik.touched.email ? formik.errors.email : ""}
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                        <input type="password" name='password' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={formik.values.password}
                            onChange={formik.handleChange} />
                    </div>
                    <div>
                        {formik.errors.password && formik.touched.password ? formik.errors.password : ""}
                    </div>
                    <div>
                        {serverError && <p className="error">{serverError}</p>}
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Identificate</button>
                </form>
            </div>
        </>
    )
}