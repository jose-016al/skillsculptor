import React, { useState, useEffect } from 'react';
import { Modal } from 'flowbite-react';

export const Search = () => {
    const [openModal, setOpenModal] = useState(false);

    // Manejar Ctrl+K para abrir el modal
    useEffect(() => {
        // Seleccionar el botón de cierre
        const closeButton = document.querySelector('.modal-close-button');

        // Si el modal está abierto, ocultamos el botón de cierre
        if (openModal && closeButton) {
            closeButton.style.display = 'none';
        }

        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 'k') {
                event.preventDefault();
                setOpenModal(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <>
            {/* Botón de búsqueda */}
            <button id="customSearchButton" type="button" className="DocSearch DocSearch-Button bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" aria-label="Search"
                onClick={() => setOpenModal(true)}>
                <span className="DocSearch-Button-Container">
                    <svg width="20" height="20" className="DocSearch-Search-Icon" viewBox="0 0 20 20"> <path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"></path> </svg>
                    <span className="DocSearch-Button-Placeholder">Search</span>
                </span>
                <span className="DocSearch-Button-Keys">
                    <kbd className="DocSearch-Button-Key">Ctrl + </kbd>
                    <kbd className="DocSearch-Button-Key">K</kbd>
                </span>
            </button>

            {/* Modal que contiene el campo de búsqueda */}
            <Modal id='custom-modal-header' className="modal-close-button" show={openModal} onClose={() => setOpenModal(false)} dismissible={true}>
                <Modal.Header id='custom-modal-header-input'>
                    {/* Quitamos la X de cierre */}
                    <svg width="20" height="20" className="DocSearch-Search-Icon" viewBox="0 0 20 20"> <path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"></path> </svg>
                    <div className="relative z-0 w-full group">
                        <input type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600" placeholder="Buscar..." required />
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        {/* Aquí puedes añadir el contenido del modal */}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/* Opcionalmente puedes añadir botones en el pie del modal */}
                </Modal.Footer>
            </Modal>
        </>
    );
};