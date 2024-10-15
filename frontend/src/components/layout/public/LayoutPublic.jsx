import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth';
import { Nav } from '../Nav';
import { NavUsersPublic } from './NavUsersPublic';


export const LayoutPublic = () => {

    const { auth } = useAuth();

    return (
        <>
            <div>
                {/* LAYOUT */}
                {/* Contenido principal */}
                <NavUsersPublic />
                <Nav />
                <main>
                    {!auth.id ? <Outlet /> : <Navigate to="/user" />}
                </main>
            </div>
        </>
    )
}