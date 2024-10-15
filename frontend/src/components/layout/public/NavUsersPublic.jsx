import { NavLink } from 'react-router-dom';

export const NavUsersPublic = () => {

    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/login">
                        <span>Login</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/register">
                        <span>Crear cuenta</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}