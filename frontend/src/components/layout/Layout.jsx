import { Navigate, Outlet } from 'react-router-dom'
import { Nav } from './Nav';
import { useAuth } from '../../hooks/useAuth';
import { NavUsersPublic } from './public/NavUsersPublic';
import { NavUsersPrivate } from './private/NavUsersPrivate';

export const Layout = () => {

    const { auth } = useAuth();

    return (
        <>
            <div className='layout'>
                {/* LAYOUT */}
                {/* Contenido principal */}
                {!auth.id ? <NavUsersPublic /> : <NavUsersPrivate />}
                <Nav />
                <main>
                    <Outlet />
                </main>
            </div>
        </>
    )
}