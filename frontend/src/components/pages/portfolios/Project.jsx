import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth';
import { useParams } from 'react-router-dom';
import { useProfile } from '../../../hooks/useProfile';
import { Pagination } from "flowbite-react";
import image from '../../../assets/img/undraw_organizing_projects_re_9p1k.svg';
import { Accordion } from "flowbite-react";
import { Global } from '../../../helpers/Global';

export const Project = () => {

  const { userid } = useParams();
  const { auth } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [currentItems, setCurrentItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const { profile, loading } = useProfile(userid);

  useEffect(() => {
    if (!loading) {
      if (profile.portfolio.project) {
        const project = profile.portfolio.project;
        // Calcular el total de páginas y los elementos actuales
        setTotalPages(Math.ceil(project.length / itemsPerPage));
        setCurrentItems(project.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
      } else {
        setTotalPages(0);
        setCurrentItems([]);
      }
    }
  }, [profile, currentPage, itemsPerPage]);

  const onPageChange = (page) => setCurrentPage(page);

  return (
    <>
      <div className='flex flex-row-reverse items-center justify-evenly px-5 mt-20 md:space-x-5'>
        {loading ?
          <div id='container-loader' className="absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-10">
            <div className="loader"></div>
          </div>
          :
          <>
            {currentItems.length === 0 ? (
              <h1>No hay información</h1>
            ) : (
              <>
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
                          <div className='flex flex-col-reverse items-center'>
                            <p>{item.description}</p>
                            {item.image &&
                              <img
                                src={`${Global.url}${item.id}/image`}
                                className="mb-5 w-3/4 lg:w-1/3  object-cover"
                                alt="project-image"
                              />
                            }
                          </div>
                          <div className='mt-3 flex justify-evenly'>
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
              </>
            )}
          </>
        }
      </div>
    </>
  )
}
