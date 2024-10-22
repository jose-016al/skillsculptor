import React, { useEffect, useState } from 'react';
import { Search } from './Search';
import { Global } from '../../helpers/Global';
import { useAuth } from '../../hooks/useAuth';
import { FaChevronDown } from "react-icons/fa";
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { useClickAway } from "@uidotdev/usehooks";
import { TiThMenu } from "react-icons/ti";
import { IoCloseSharp } from "react-icons/io5";

export const Nav = () => {
  const { auth } = useAuth();
  const { userid } = useParams();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const ref = useClickAway(() => {
    setOpenMenu(false);
    setOpenDropdown(false);
  });

  const handleOpenNavUser = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleToggleMenu = () => {
    setOpenMenu(prev => !prev); // Alternar el estado del menú
  };

  useEffect(() => {
    setOpenMenu(false); // Cierra el menú cuando la ubicación cambia
  }, [location]);

  return (
    <nav className="z-20 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700" id='nav'>
      <div ref={ref} className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink className="flex items-center space-x-3 rtl:space-x-reverse"
          to={`/`}>
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">SkillsCulptor</span>
        </NavLink>

        {/* Botón de menú para pantallas pequeñas */}
        <button
          type="button"
          className="inline-flex items-center p-2 justify-center text-lg text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded={openMenu}
          onClick={handleToggleMenu}
        >
          {openMenu ? <IoCloseSharp /> : <TiThMenu />}
        </button>

        {/* Menú y componente de búsqueda alineados con flex */}
        <div className={`mt-2 md:mt-0 md:flex flex-wrap items-center justify-between ${openMenu ? 'block' : 'hidden'} w-full md:w-auto`} id="menu">
          {/* Componente Search alineado con el menú */}
          <div className="mx-4">
            <Search />
          </div>

          {/* Menú */}
          <ul className="flex flex-col md:items-center font-medium p-4 md:p-0 mt-4 custom-ul md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
            {auth.id && (
              <li className="relative">
                <button id="dropdownNavbarLink" type="button" className="w-full flex items-center space-x-2 px-2 text-sm bg-whiite-100 dark:bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="user-dropdown"
                  onClick={handleOpenNavUser}>
                  <img className="w-8 h-8 rounded-full" src={`${Global.url}${auth.id}/avatar`} alt="user photo" />
                  <span>{auth.name}</span>
                  <FaChevronDown />
                </button>
                <div id="dropdownNavbar"
                  className={`${openDropdown ? 'block' : 'hidden'} z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                    {auth.id && auth.roles.includes("ROLE_ADMIN") &&
                      <li className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                        <a href="http://localhost:300/" target="_blank" rel="noopener noreferrer">
                          DashBoard
                        </a>
                      </li>
                    }
                    <li>
                      <NavLink className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        to={`/user`}>
                        Mi perfil
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        to={`/user/edit/${auth.id}`}>
                        Editar
                      </NavLink>
                    </li>
                  </ul>
                  <div className="py-1">
                    <NavLink className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      to="/user/logout">
                      Sign out
                    </NavLink>
                  </div>
                </div>
              </li>
            )}
            {userid ?
              <>
                <li>
                  <NavLink id='link' to={`/profiles/home/${userid}`} className={({ isActive }) =>
                    isActive
                      ? 'text-blue-500 font-bold block py-2 px-3 md:p-0'
                      : 'text-white-100 block py-2 px-3 md:p-0'
                  }>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink id='link' to={`/profiles/education/${userid}`} className={({ isActive }) =>
                    isActive
                      ? 'text-blue-500 font-bold block py-2 px-3 md:p-0'
                      : 'text-white-100 block py-2 px-3 md:p-0'
                  }>
                    Educación
                  </NavLink>
                </li>
                <li>
                  <NavLink id='link' to={`/profiles/experience/${userid}`} className={({ isActive }) =>
                    isActive
                      ? 'text-blue-500 font-bold block py-2 px-3 md:p-0'
                      : 'text-white-100 block py-2 px-3 md:p-0'
                  }>
                    Experiencia
                  </NavLink>
                </li>
                <li>
                  <NavLink id='link' to={`/profiles/project/${userid}`} className={({ isActive }) =>
                    isActive
                      ? 'text-blue-500 font-bold block py-2 px-3 md:p-0'
                      : 'text-white-100 block py-2 px-3 md:p-0'
                  }>
                    Proyectos
                  </NavLink>
                </li>
              </>
              :
              auth.id ?
                <>
                  <li>
                    <NavLink id='link' to={`/profiles/home`} className={({ isActive }) =>
                      isActive
                        ? 'text-blue-500 font-bold block py-2 px-3 md:p-0'
                        : 'text-white-100 block py-2 px-3 md:p-0'
                    }>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink id='link' to={`/profiles/education`} className={({ isActive }) =>
                      isActive
                        ? 'text-blue-500 font-bold block py-2 px-3 md:p-0'
                        : 'text-white-100 block py-2 px-3 md:p-0'
                    }>
                      Educación
                    </NavLink>
                  </li>
                  <li>
                    <NavLink id='link' to={`/profiles/experience`} className={({ isActive }) =>
                      isActive
                        ? 'text-blue-500 font-bold block py-2 px-3 md:p-0'
                        : 'text-white-100 block py-2 px-3 md:p-0'
                    }>
                      Experiencia
                    </NavLink>
                  </li>
                  <li>
                    <NavLink id='link' to={`/profiles/project`} className={({ isActive }) =>
                      isActive
                        ? 'text-blue-500 font-bold block py-2 px-3 md:p-0'
                        : 'text-white-100 block py-2 px-3 md:p-0'
                    }>
                      Proyectos
                    </NavLink>
                  </li>
                </>
                :
                <>
                  <li>
                    <NavLink id='link' to={`/`} className={({ isActive }) =>
                      isActive
                        ? 'text-blue-500 font-bold block py-2 px-3 md:p-0'
                        : 'text-white-100 block py-2 px-3 md:p-0'
                    }>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink id='link' to={`/education`} className={({ isActive }) =>
                      isActive
                        ? 'text-blue-500 font-bold block py-2 px-3 md:p-0'
                        : 'text-white-100 block py-2 px-3 md:p-0'
                    }>
                      Educación
                    </NavLink>
                  </li>
                  <li>
                    <NavLink id='link' to={`/experience`} className={({ isActive }) =>
                      isActive
                        ? 'text-blue-500 font-bold block py-2 px-3 md:p-0'
                        : 'text-white-100 block py-2 px-3 md:p-0'
                    }>
                      Experiencia
                    </NavLink>
                  </li>
                  <li>
                    <NavLink id='link' to={`/project`} className={({ isActive }) =>
                      isActive
                        ? 'text-blue-500 font-bold block py-2 px-3 md:p-0'
                        : 'text-white-100 block py-2 px-3 md:p-0'
                    }>
                      Proyectos
                    </NavLink>
                  </li>
                </>
            }

            {!auth.id && (
              <NavLink to="/login" className="p-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Login
              </NavLink>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
