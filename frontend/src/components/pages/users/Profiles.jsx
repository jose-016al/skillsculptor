import React, { useEffect, useState } from 'react'
import { Global } from '../../../helpers/Global';
import { ApiRequests } from '../../../helpers/ApiRequests';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { Home } from '../portfolios/Home';

export const Profiles = () => {

    const { userid } = useParams();
    const { auth } = useAuth();
    const [ profile, setProfile] = useState([]);

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        const token = localStorage.getItem('token');
        let id;
        if (userid) {
            id = userid
        } else {
            id = auth.id
        }
        try {
            /* Peticion para sacar usuarios */
            const { data, status } = await ApiRequests(`${Global.url}${id}/profile`, "GET", undefined, false, token);
            if (status === 200) {
                setProfile(data);
            } 
        } catch (error) {
            console.error("Error en la solicitud", error);
        }
    }


    return (
        <Home profile={profile} />
    )
}
