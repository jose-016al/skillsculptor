import { Outlet } from 'react-router-dom'
import { Nav } from './Nav';
import { ScrollBar } from './ScrollBar';

export const Layout = () => {

    return (
        <>
            <ScrollBar />
            <Nav />
            <main>
                <Outlet />
            </main>
        </>
    )
}