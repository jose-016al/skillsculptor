import React, { useEffect, useState } from 'react';
import { Search } from './Search';
import { Global } from '../../helpers/Global';
import { useAuth } from '../../hooks/useAuth';
import { FaChevronDown } from "react-icons/fa";
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { useClickAway } from "@uidotdev/usehooks";
import { TiThMenu } from "react-icons/ti";
import { IoCloseSharp } from "react-icons/io5";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useTheme } from '../../hooks/useTheme';

export const Nav = () => {
  const { auth } = useAuth();
  const { userid } = useParams();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  useTheme();

  const ref = useClickAway(() => {
    setOpenMenu(false);
  });

  useEffect(() => {
    setOpenMenu(false);
  }, [location]);

  const handleToggleMenu = () => {
    setOpenMenu(!openMenu);
  };


  return (
    <div ref={ref}>
      <Navbar fluid rounded className="fixed top-0 z-20 w-full backdrop-blur-xl" id='nav-custom'>
        <NavLink to={`/`}>
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">SkillsCulptor</span>
        </NavLink>
        <div className="flex md:order-2 space-x-2 md:spa">
          {auth.id ?
            <Dropdown arrowIcon={false} inline
              label={
                <img className="w-10 h-10 rounded-full object-cover" src={`${Global.url}${auth.id}/avatar`} alt="Rounded avatar" />

              }>
              <Dropdown.Header>
                <span className="block text-sm">{`${auth.name} ${auth.last_name}`}</span>
                <span className="block truncate text-sm font-medium">{auth.email}</span>
              </Dropdown.Header>
              {auth.id && auth.roles.includes("ROLE_ADMIN") &&
                <a href="http://localhost:300/" target="_blank" rel="noopener noreferrer">
                  <Dropdown.Item>DashBoard</Dropdown.Item>
                </a>
              }
              <NavLink to={`/user`}>
                <Dropdown.Item>Mi perfil</Dropdown.Item>
              </NavLink>
              <NavLink to={`/user/edit/${auth.id}`}>
                <Dropdown.Item>Editar perfil</Dropdown.Item>
              </NavLink>
              <Dropdown.Divider />
              <NavLink to="/user/logout">
                <Dropdown.Item>Cerrar sesión</Dropdown.Item>
              </NavLink>
            </Dropdown>
            :
            <NavLink to="/login" className="p-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Login
            </NavLink>
          }
          <button
            type="button"
            className="text-3xl px-2 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-dropdown"
            aria-expanded={openMenu}
            onClick={handleToggleMenu}
          >
            {openMenu ? <IoCloseSharp /> : <TiThMenu />}
          </button>
        </div>
        <div className={`md:flex px-5 space-y-2 mt-3 md:mt-0 md:space-y-0 md:space-x-5 ${!openMenu && 'hidden'} w-full md:w-auto`}>
          <Search />
          <ul className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-5">
            {userid ?
              <>
                <li>
                  <NavLink to={`/profiles/home/${userid}`} className={({ isActive }) =>
                    isActive
                      ? 'text-blue-500 font-bold block py-1 px-2 transition-colors duration-300 focus:outline-none rounded-lg hover:bg-gray-400 focus:z-10 focus:ring-4 focus:ring-gray-400 dark:focus:ring-gray-700 dark:border-gray-700 dark:hover:bg-gray-700'
                      : 'text-white-100 block py-1 px-2 transition-colors duration-300 focus:outline-none rounded-lg hover:bg-gray-400 focus:z-10 focus:ring-4 focus:ring-gray-400 dark:focus:ring-gray-700 dark:border-gray-700 dark:hover:bg-gray-700'
                  }>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/profiles/education/${userid}`} className={({ isActive }) =>
                    isActive
                      ? 'text-blue-500 font-bold block py-1 px-2 transition-colors duration-300 focus:outline-none rounded-lg hover:bg-gray-400 focus:z-10 focus:ring-4 focus:ring-gray-400 dark:focus:ring-gray-700 dark:border-gray-700 dark:hover:bg-gray-700'
                      : 'text-white-100 block py-1 px-2 transition-colors duration-300 focus:outline-none rounded-lg hover:bg-gray-400 focus:z-10 focus:ring-4 focus:ring-gray-400 dark:focus:ring-gray-700 dark:border-gray-700 dark:hover:bg-gray-700'
                  }>
                    Educación
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/profiles/experience/${userid}`} className={({ isActive }) =>
                    isActive
                      ? 'text-blue-500 font-bold block py-1 px-2 transition-colors duration-300 focus:outline-none rounded-lg hover:bg-gray-400 focus:z-10 focus:ring-4 focus:ring-gray-400 dark:focus:ring-gray-700 dark:border-gray-700 dark:hover:bg-gray-700'
                      : 'text-white-100 block py-1 px-2 transition-colors duration-300 focus:outline-none rounded-lg hover:bg-gray-400 focus:z-10 focus:ring-4 focus:ring-gray-400 dark:focus:ring-gray-700 dark:border-gray-700 dark:hover:bg-gray-700'
                  }>
                    Experiencia
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/profiles/project/${userid}`} className={({ isActive }) =>
                    isActive
                      ? 'text-blue-500 font-bold block py-1 px-2 transition-colors duration-300 focus:outline-none rounded-lg hover:bg-gray-400 focus:z-10 focus:ring-4 focus:ring-gray-400 dark:focus:ring-gray-700 dark:border-gray-700 dark:hover:bg-gray-700'
                      : 'text-white-100 block py-1 px-2 transition-colors duration-300 focus:outline-none rounded-lg hover:bg-gray-400 focus:z-10 focus:ring-4 focus:ring-gray-400 dark:focus:ring-gray-700 dark:border-gray-700 dark:hover:bg-gray-700'
                  }>
                    Proyectos
                  </NavLink>
                </li>
              </>
              :
              auth.id ?
                <>
                  <li>
                    <NavLink to={`/profiles/home`} className={({ isActive }) =>
                      isActive
                        ? 'text-blue-500 font-bold block py-1 px-2 transition-colors duration-300 focus:outline-none rounded-lg hover:bg-gray-400 focus:z-10 focus:ring-4 focus:ring-gray-400 dark:focus:ring-gray-700 dark:border-gray-700 dark:hover:bg-gray-700'
                        : 'text-white-100 block py-1 px-2 transition-colors duration-300 focus:outline-none rounded-lg hover:bg-gray-400 focus:z-10 focus:ring-4 focus:ring-gray-400 dark:focus:ring-gray-700 dark:border-gray-700 dark:hover:bg-gray-700'
                    }>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={`/profiles/education`} className={({ isActive }) =>
                      isActive
                        ? 'text-blue-500 font-bold block py-1 px-2 transition-colors duration-300 focus:outline-none rounded-lg hover:bg-gray-400 focus:z-10 focus:ring-4 focus:ring-gray-400 dark:focus:ring-gray-700 dark:border-gray-700 dark:hover:bg-gray-700'
                        : 'text-white-100 block py-1 px-2 transition-colors duration-300 focus:outline-none rounded-lg hover:bg-gray-400 focus:z-10 focus:ring-4 focus:ring-gray-400 dark:focus:ring-gray-700 dark:border-gray-700 dark:hover:bg-gray-700'
                    }>
                      Educación
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={`/profiles/experience`} className={({ isActive }) =>
                      isActive
                        ? 'text-blue-500 font-bold block py-1 px-2 transition-colors duration-300 focus:outline-none rounded-lg hover:bg-gray-400 focus:z-10 focus:ring-4 focus:ring-gray-400 dark:focus:ring-gray-700 dark:border-gray-700 dark:hover:bg-gray-700'
                        : 'text-white-100 block py-1 px-2 transition-colors duration-300 focus:outline-none rounded-lg hover:bg-gray-400 focus:z-10 focus:ring-4 focus:ring-gray-400 dark:focus:ring-gray-700 dark:border-gray-700 dark:hover:bg-gray-700'
                    }>
                      Experiencia
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={`/profiles/project`} className={({ isActive }) =>
                      isActive
                        ? 'text-blue-500 font-bold block py-1 px-2 transition-colors duration-300 focus:outline-none rounded-lg hover:bg-gray-400 focus:z-10 focus:ring-4 focus:ring-gray-400 dark:focus:ring-gray-700 dark:border-gray-700 dark:hover:bg-gray-700'
                        : 'text-white-100 block py-1 px-2 transition-colors duration-300 focus:outline-none rounded-lg hover:bg-gray-400 focus:z-10 focus:ring-4 focus:ring-gray-400 dark:focus:ring-gray-700 dark:border-gray-700 dark:hover:bg-gray-700'
                    }>
                      Proyectos
                    </NavLink>
                  </li>
                </>
                :
                <>
                  <li>
                    <NavLink to={`/`} className={({ isActive }) =>
                      isActive
                        ? 'text-blue-500 font-bold block py-1 px-2 transition-colors duration-300 focus:outline-none rounded-lg hover:bg-gray-400 focus:z-10 focus:ring-4 focus:ring-gray-400 dark:focus:ring-gray-700 dark:border-gray-700 dark:hover:bg-gray-700'
                        : 'text-white-100 block py-1 px-2 transition-colors duration-300 focus:outline-none rounded-lg hover:bg-gray-400 focus:z-10 focus:ring-4 focus:ring-gray-400 dark:focus:ring-gray-700 dark:border-gray-700 dark:hover:bg-gray-700'
                    }>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={`/education`} className={({ isActive }) =>
                      isActive
                        ? 'text-blue-500 font-bold block py-1 px-2 transition-colors duration-300 focus:outline-none rounded-lg hover:bg-gray-400 focus:z-10 focus:ring-4 focus:ring-gray-400 dark:focus:ring-gray-700 dark:border-gray-700 dark:hover:bg-gray-700'
                        : 'text-white-100 block py-1 px-2 transition-colors duration-300 focus:outline-none rounded-lg hover:bg-gray-400 focus:z-10 focus:ring-4 focus:ring-gray-400 dark:focus:ring-gray-700 dark:border-gray-700 dark:hover:bg-gray-700'
                    }>
                      Educación
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={`/experience`} className={({ isActive }) =>
                      isActive
                        ? 'text-blue-500 font-bold block py-1 px-2 transition-colors duration-300 focus:outline-none rounded-lg hover:bg-gray-400 focus:z-10 focus:ring-4 focus:ring-gray-400 dark:focus:ring-gray-700 dark:border-gray-700 dark:hover:bg-gray-700'
                        : 'text-white-100 block py-1 px-2 transition-colors duration-300 focus:outline-none rounded-lg hover:bg-gray-400 focus:z-10 focus:ring-4 focus:ring-gray-400 dark:focus:ring-gray-700 dark:border-gray-700 dark:hover:bg-gray-700'
                    }>
                      Experiencia
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={`/project`} className={({ isActive }) =>
                      isActive
                        ? 'text-blue-500 font-bold block py-1 px-2 transition-colors duration-300 focus:outline-none rounded-lg hover:bg-gray-400 focus:z-10 focus:ring-4 focus:ring-gray-400 dark:focus:ring-gray-700 dark:border-gray-700 dark:hover:bg-gray-700'
                        : 'text-white-100 block py-1 px-2 transition-colors duration-300 focus:outline-none rounded-lg hover:bg-gray-400 focus:z-10 focus:ring-4 focus:ring-gray-400 dark:focus:ring-gray-700 dark:border-gray-700 dark:hover:bg-gray-700'
                    }>
                      Proyectos
                    </NavLink>
                  </li>
                </>
            }
          </ul>
        </div>
      </Navbar>
    </div>
  );
};
