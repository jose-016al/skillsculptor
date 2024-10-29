import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth';
import { Nav } from '../Nav';

export const LayoutPublic = () => {

    const { auth } = useAuth();

    return (
        <>
            <Nav />
            <main>
                {!auth.id ? <Outlet /> : <Navigate to="/user" />}
            </main>
        </>
    )
}