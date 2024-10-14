import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'
import { Home } from '../components/pages/Home/Home'
import { Error } from '../components/pages/Error'
import { Login } from '../components/pages/users/Login'
import { AuthProvider } from '../context/AuthProvider'

export const Routing = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path='login' element={<Login />} />
                    </Route>

                    <Route path='*' element={<Error />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}