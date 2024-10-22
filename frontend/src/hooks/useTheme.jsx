import { useEffect, useState } from 'react';

export const useTheme = () => {
    const [theme, setTheme] = useState(() => {
        // Leer el tema desde localStorage o usar 'dark' por defecto
        return localStorage.getItem('theme') || 'dark';
    });
    const [switch1, setSwitch1] = useState(theme === 'dark');

    useEffect(() => {
        const htmlElement = document.querySelector('html');
        const customUlElement = document.querySelector('.custom-ul'); // Selecciona el ul con la clase 'custom-ul'

        if (theme === 'dark') {
            htmlElement?.classList.add('dark');
            customUlElement?.classList.add('custom-ul-dark');
            customUlElement?.classList.remove('custom-ul-light');
            setSwitch1(true);
        } else {
            htmlElement?.classList.remove('dark');
            customUlElement?.classList.add('custom-ul-light');
            customUlElement?.classList.remove('custom-ul-dark');
            setSwitch1(false);
        }

        // Guardar el tema actual en localStorage
        localStorage.setItem('theme', theme);

    }, [theme]);

    const changeTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // Devolver un array o un objeto con los valores que quieres utilizar en el componente principal
    return { switch1, changeTheme };
};
