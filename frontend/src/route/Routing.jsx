import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'
import { Error } from '../components/pages/Error'
import { Login } from '../components/pages/users/Login'
import { AuthProvider } from '../context/AuthProvider'
import { Register } from '../components/pages/users/Register'
import { LayoutPublic } from '../components/layout/public/LayoutPublic'
import { LayoutPrivate } from '../components/layout/private/LayoutPrivate'
import { Logout } from '../components/pages/users/Logout'
import { Edit } from '../components/pages/users/Edit'
import { DHome } from '../components/pages/Default/DHome'
import { Home } from '../components/pages/portfolios/Home'
import { Profiles } from '../components/pages/users/Profiles'

export const Routing = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path='/profiles' element={<Layout />}>
                        <Route path=':userid' element={<Profiles />} />
                    </Route>

                    {/* Cuando no existe un usuario logueado */}
                    <Route path='/' element={<LayoutPublic />}>
                        <Route index element={<DHome />} />
                        <Route path='login' element={<Login />} />
                        <Route path='register' element={<Register />} />
                    </Route>

                    {/* Usuarios logueados */}
                    <Route path='/user' element={<LayoutPrivate />}>
                        <Route index element={<Profiles />} />
                        <Route path='edit/:userid' element={<Edit />} />
                        <Route path='logout' element={<Logout />} />
                    </Route>

                    <Route path='*' element={<Error />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}