import { NavLink, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Nav = () => {
    
    const { auth } = useAuth();
    const { userid } = useParams();
    
    return (
        <nav>
            <ul>
                {auth.id ?
                    userid ?
                        <li>
                            <NavLink to={`/profiles/${userid}`}>
                                <span>Home</span>
                            </NavLink>
                        </li>
                    :
                        <li>
                            <NavLink to={`/profiles/${auth.id}`}>
                                <span>Home</span>
                            </NavLink>
                        </li>
                :
                    <li>
                        <NavLink to={`/`}>
                            <span>Home</span>
                        </NavLink>
                    </li>
                }
            </ul>
        </nav>
    )
}