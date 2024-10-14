import { Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth';

export const Layout = () => {

    return (
        <>
            <div className='layout'>
                {/* LAYOUT */}
                {/* Contenido principal */}
                <main>
                    <Outlet />
                </main>
            </div>
        </>
    )
}