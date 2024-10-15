import React, { useEffect, useState } from 'react';
import { createContext } from "react";
import { Global } from '../helpers/Global';
import { ApiRequests } from '../helpers/ApiRequests';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        authUser();
        getUsers();
    }, []);

    const authUser = async () => {
        /* Sacar datos del usuario identificado del localStorage */
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        /* Comprobar si tengo el token y el user */
        if (!token || !user) {
            false;
            setLoading(false);
        } else {
            /* Transformar los datos a un objeto de javsscript */
            const userObjt = JSON.parse(user);
            const userId = userObjt.id;
    
            /* Peticion ajaz al backend que compruebe el token y que me devuleva todos los datos del usuario */
    
            const request = await ApiRequests(`${Global.url}${userId}/profile`, "GET", undefined, false, token);
    
            const data = await request.data;
    
            /* Setear el estado de auth */
            setAuth(data);
            setLoading(false);
        }
    }

    const getUsers = async () => {
        try {
            /* Peticion para sacar usuarios */
            const { data, status } = await ApiRequests(`${Global.url}users`, "GET", undefined, false);
            if (status === 200) {
                setUsers(data);
            } 
        } catch (error) {
            console.error("Error en la solicitud", error);
        }
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, loading, users }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;