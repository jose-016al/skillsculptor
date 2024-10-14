import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Global } from '../../../helpers/Global';
import { ApiRequests } from '../../../helpers/ApiRequests';

export const Login = ({ onUserChange }) => {
 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);
    const [errorMessageEmail, setErrorMessageEmail] = useState("");
    const [errorMessagePassword, setErrorMessagePassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = { email, password };
        try {
            const { data, status } = await ApiRequests(`${Global.url}login`, "POST", user);
            // Verifica si la respuesta es exitosa
            if (status === 200) {
                console.log(data);
            } else if (status === 402) {
                console.log("No existe ninguna cuenta con este email");
            } else if (status === 401) {
                console.log("Contraseña incorrecta");
            }
        } catch (error) {
            console.error("Error en la solicitud", error);
        }
    }
    
    if (isRegistered) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <>
            <div className='container'>
                <div className='row justify-content-center'>
                    <h2 className='text-center mb-4 mt-4'>Login</h2>
                    <form className='col-12 col-md-4' id='containerLogin' onSubmit={handleSubmit} >
                        <div className="mb-2">
                            <label className="form-label">Correo electronico</label>
                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                            {errorMessageEmail && <div className="error text-danger">{errorMessageEmail}</div>}
                        </div>
                        <div className="mb-4">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                            {errorMessagePassword && <div className="error text-danger">{errorMessagePassword}</div>}
                        </div>
                        <div className="d-grid">
                            <button id='btn-color' className="btn" type="submit">Iniciar sesion</button>
                        </div>
                        <div className="my-3">
                            <span>¿No tienes cuenta? <Link to={`/Register`}>Crea tu cuenta</Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}