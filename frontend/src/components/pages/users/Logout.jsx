import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export const Logout = () => {

    const {setAuth} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        /* Vaciar el localStorage */
        localStorage.clear();

        /* Setear estados globales a vacio */
        setAuth({});

        /* Navigate (redireccion) al login */
        // location.reload();
        // navigate("/");
    });

    return (
        <h1>Cerrando sesion...</h1>
    )
}