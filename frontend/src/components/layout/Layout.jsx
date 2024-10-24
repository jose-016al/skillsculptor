import { Navigate, Outlet } from 'react-router-dom'
import { Nav } from './Nav';
import { useAuth } from '../../hooks/useAuth';

export const Layout = () => {

    const { auth } = useAuth();

    return (
        <>
            {/* LAYOUT */}
            {/* Contenido principal */}
            <Nav />
            <main>
                <Outlet />
            </main>
        </>
    )
}