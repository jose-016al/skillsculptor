import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

export const NavUsersPrivate = () => {

    const { auth } = useAuth();

    return (
        <nav>
            <ul>
                {auth.id && auth.roles.includes("ROLE_ADMIN") && 
                    <li><a href="http://localhost:300/" target="_blank" rel="noopener noreferrer">DashBoard</a></li>
                } 
                <li>
                    <NavLink to={`/profiles/${auth.id}`}>
                        <span>Mi perfil</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/user/edit/${auth.id}`}>
                        <span>Editar Pefil</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/user/logout">
                        <span>Cerrar sesión</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}