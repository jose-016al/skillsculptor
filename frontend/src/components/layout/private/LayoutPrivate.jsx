import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth';
import { Nav } from '../Nav';
import { NavUsersPrivate } from './NavUsersPrivate';


export const LayoutPrivate = () => {

    const { auth } = useAuth();

    return (
        <>
            <div>
                {/* LAYOUT */}
                {/* Contenido principal */}
                <NavUsersPrivate />
                <Nav />
                <main>
                    {auth.id ? <Outlet /> : <Navigate to="/" />}
                </main>
            </div>
        </>
    )
}