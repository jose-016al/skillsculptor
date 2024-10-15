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
                <div>
                    <span>LOGIN</span>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <input type="email" name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange} 
                            placeholder="&nbsp;" />
                        <label htmlFor="email">Correo electronico</label>
                    </div>
                    <div>
                        {formik.errors.email && formik.touched.email ? formik.errors.email : ""}
                    </div>
                    <div>
                        <input type="password" name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            placeholder="&nbsp;" />
                        <label htmlFor="password">Contraseña</label>
                    </div>
                    <div>
                        {formik.errors.password && formik.touched.password ? formik.errors.password : ""}
                    </div>
                    <div>
                        {serverError && <p className="error">{serverError}</p>}
                    </div>
                    <div>
                        <Link to="/register">Registro</Link>
                        <input type="submit" value="Identificate" />
                    </div>
                </form>
            </div>
        </>
    )
}