import React, { useState } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import { Button, Modal } from 'flowbite-react';
import { ApiRequests } from '../../../../helpers/ApiRequests'; 
import { Global } from '../../../../helpers/Global'; 
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Alert } from '../../../layout/Alert';

export const Remove = ({ id }) => {
    const [serverError, setServerError] = useState("");
    const [statusError, setStatusError] = useState("");
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false); 
    const { auth, setAuth } = useAuth(); 

    const deleteProyect = async () => {
        setServerError("");
        setStatusError("");
        setLoading(true); // Iniciamos el estado de carga
        try {
            const token = localStorage.getItem('token');

            // Realiza la solicitud de eliminación
            const { status } = await ApiRequests(`${Global.url}${id}/delete/project`, "DELETE", undefined, false, token);
            
            // Verifica el estado de la respuesta
            if (status === 204) {
                // Filtra el proyecto eliminado del array
                const updatedProjects = auth.portfolio.project.filter(proj => proj.id !== id);
                
                // Actualiza el estado de auth con los proyectos actualizados
                setAuth({
                    ...auth,
                    portfolio: {
                        ...auth.portfolio,
                        project: updatedProjects
                    }
                });
                setServerError("Proyecto eliminado correctamente");
                setStatusError("success");
                setLoading(false);
            } else {
                setServerError("Error al eliminar el proyecto."); 
                setStatusError("error");
                setLoading(false);
            }
        } catch (error) {
            setServerError("Error en la solicitud, intenta más tarde.");
            setStatusError("warning");
            setLoading(false);
        }
    };

    const handleDelete = () => {
        setOpenModal(false); 
        deleteProyect(); 
    };

    return (
        <div>
            <Button
                type="button" 
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg w-full sm:w-auto p-0 m-0 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                onClick={() => setOpenModal(true)} 
            >
                Eliminar
            </Button>

            {/* Modal de confirmación */}
            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            ¿Estás seguro de que deseas eliminar este proyecto?
                        </h3>

                        {/* Mostrar loader dentro del modal si loading es true */}
                        {loading ? (
                            <div className="flex justify-center items-center">
                                <div className="loader"></div> {/* Aquí puedes usar tu propio componente de loader */}
                            </div>
                        ) : (
                            <div className="flex justify-center gap-4">
                                <Button color="failure" onClick={handleDelete}>
                                    Sí, estoy seguro
                                </Button>
                                <Button color="gray" onClick={() => setOpenModal(false)}>
                                    No, cancelar
                                </Button>
                            </div>
                        )}
                    </div>
                </Modal.Body>
            </Modal>

            <div>
                {serverError && <Alert message={serverError} status={statusError} />}
            </div>
        </div>
    );
};
