import React, { useEffect, useState } from 'react';
import { Pagination } from "flowbite-react";
import image from '../../../assets/img/undraw_organizing_projects_re_9p1k.svg';
import { Accordion } from "flowbite-react";

export const DProject = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [currentItems, setCurrentItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const projectsItems = [
    {
      title: 'Twitch Clone',
      description: 'Un clon de la popular plataforma de streaming Twitch, que permite a los usuarios transmitir y ver contenido en vivo. Incluye funciones de chat en tiempo real y seguimiento de usuarios.',
      demo: 'https://twitch-clone-demo.example.com',
      github: 'https://github.com/usuario/twitch-clone'
    },
    {
      title: 'Portfolio Personal',
      description: 'Un sitio web personal diseñado para mostrar proyectos y habilidades. Incluye una sección de contacto y una galería de proyectos destacados.',
      demo: 'https://mi-portfolio.example.com',
      github: ''
    },
    {
      title: 'E-commerce Platform',
      description: 'Plataforma de comercio electrónico que permite a los usuarios comprar y vender productos. Incluye gestión de inventario y pasarelas de pago.',
      demo: '',
      github: 'https://github.com/usuario/ecommerce-platform'
    },
    {
      title: 'Blog de Viajes',
      description: 'Un blog que permite a los usuarios compartir sus experiencias de viaje. Incluye funcionalidad de comentarios y suscripción al boletín.',
      demo: 'https://blog-de-viajes.example.com',
      github: 'https://github.com/usuario/blog-de-viajes'
    },
    {
      title: 'Gestor de Tareas',
      description: 'Aplicación web para la gestión de tareas que permite a los usuarios crear, editar y eliminar tareas, y organizarlas por prioridades.',
      demo: '',
      github: ''
    },
    {
      title: 'Red Social para Desarrolladores',
      description: 'Una red social diseñada específicamente para desarrolladores, donde pueden compartir proyectos, realizar preguntas y colaborar en trabajos.',
      demo: 'https://red-social-desarrolladores.example.com',
      github: 'https://github.com/usuario/red-social-desarrolladores'
    },
    {
      title: 'Foro de Discusión',
      description: 'Un foro en línea que permite a los usuarios iniciar discusiones sobre diversos temas y participar en conversaciones.',
      demo: '',
      github: 'https://github.com/usuario/foro-de-discusion'
    },
  ];


  useEffect(() => {
    const total = projectsItems.length;
    setTotalPages(Math.ceil(total / itemsPerPage));
    const items = projectsItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    setCurrentItems(items);
  }, [currentPage, itemsPerPage]);

  const onPageChange = (page) => setCurrentPage(page);

  return (
    <>
      <div className='flex flex-row-reverse items-center justify-evenly md:h-screen px-5 mt-20 md:mt-0 md:space-x-5'>
        <div className="w-2/5 hidden md:flex items-center justify-center">
          <img
            src={image}
            className="md:max-w-md w-full h-full object-cover"
            alt="education-image"
          />
        </div>

        <div className='w-full md:w-1/2'>
          <Accordion>
            {currentItems.map((item, index) => (
              <Accordion.Panel key={index}>
                <Accordion.Title>{item.title}</Accordion.Title>
                <Accordion.Content>
                  {item.description}
                  <div className='mt-3 flex justify-between'>
                    {item.demo &&
                      <a href={item.demo} className='text-white-100  py-1 px-2 transition-colors duration-300 focus:outline-none rounded-lg bg-blue-700 hover:bg-blue-500 focus:z-10 focus:ring-4 focus:ring-blue-500' target="_blank" rel="noopener noreferrer">
                        Demo
                      </a>
                    }
                    {item.github &&
                      <a href={item.github} className='text-white-100  py-1 px-2 transition-colors duration-300 focus:outline-none rounded-lg bg-blue-700 hover:bg-blue-500 focus:z-10 focus:ring-4 focus:ring-blue-500' target="_blank" rel="noopener noreferrer">
                        GitHub
                      </a>
                    }
                  </div>
                </Accordion.Content>
              </Accordion.Panel>
            ))}
          </Accordion>

          {totalPages > 1 &&
            <div className="flex justify-center mt-5">
              <Pagination
                layout="navigation"
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                nextLabel="Siguiente"
                previousLabel="Anterior"
              />
            </div>
          }
        </div>
      </div>
    </>
  );
};
