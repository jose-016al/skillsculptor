import { Sidebar } from './Sidebar'
import { Global } from '../../../../helpers/Global';
import { useAuth } from '../../../../hooks/useAuth';
import { Add } from '../../portfolios/Project/Add';
import { Accordion } from "flowbite-react";
import { Remove } from '../../portfolios/Project/Remove';
import { Update } from '../../portfolios/Project/Update';

export const EditProject = () => {

  const { auth } = useAuth();

  return (
    <div className='md:container mx-3 mb-10 md:mx-auto flex flex-col md:flex-row mt-20 border border-gray-300 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900'>
      <div>
        <Sidebar />
      </div>
      <div className='w-full flex flex-col'>
        <Add />
        <div>
          {auth.portfolio.project.length !== 0 &&
            <div>
              <Accordion>
                {auth.portfolio.project.map((item, index) => (
                  <Accordion.Panel key={index}>
                    <Accordion.Title>{item.title}</Accordion.Title>
                    <Accordion.Content>
                      <div className='flex flex-col-reverse items-center'>
                        <p>{item.description}</p>
                        {item.image &&
                          <img
                            src={`${Global.url}image/${item.image}`}
                            className="mb-2 w-3/4 lg:w-1/3  object-cover"
                            alt="project-image"
                          />
                        }
                      </div>
                      <div className='flex flex-col md:flex-row-reverse items-center justify-between mt-3'>
                        <div className='flex space-x-4'>
                          {item.demo &&
                            <a href={item.demo} className="text-blue-700 rounded-lg w-full sm:w-auto px-5 py-2.5 text-center" target="_blank" rel="noopener noreferrer">
                              Demo
                            </a>
                          }
                          {item.github &&
                            <a href={item.github} className="text-blue-700 rounded-lg w-full sm:w-auto px-5 py-2.5 text-center" target="_blank" rel="noopener noreferrer">
                              GitHub
                            </a>
                          }
                        </div>
                        <div className='flex space-x-4'>
                          <Update project={item} />
                          <Remove id={item.id} />
                        </div>
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                )).reverse()}
              </Accordion>
            </div>
          }
        </div>
      </div >
    </div >
  )
}
