import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth';
import { Nav } from '../Nav';


export const LayoutPrivate = () => {

    const { auth, loading } = useAuth();

    return (
        <>
            {/* LAYOUT */}
            {/* Contenido principal */}
            <Nav />
            {loading &&
                <div id='container-loader' className="absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-10">
                    <div className="loader"></div>
                </div>
            }
            <main>
                {auth.id ? <Outlet /> : <Navigate to="/" />}
            </main>
        </>
    )
}