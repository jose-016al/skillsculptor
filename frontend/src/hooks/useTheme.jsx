import { useEffect, useState } from 'react';

export const useTheme = () => {

    const [theme, setTheme] = useState(() => {
        // Leer el tema desde localStorage o usar 'dark' por defecto
        return localStorage.getItem('theme') || 'dark';
    });
    const [switch1, setSwitch1] = useState(theme === 'dark');

    useEffect(() => {
        const htmlElement = document.querySelector('html');
        const customNavElement = document.querySelector('#nav-custom'); 

        if (theme === 'dark') {
            htmlElement?.classList.add('dark');
            customNavElement?.classList.add('nav-custom-dark');
            customNavElement?.classList.remove('nav-custom-light');
            setSwitch1(true);
        } else {
            htmlElement?.classList.remove('dark');
            customNavElement?.classList.add('nav-custom-light');
            customNavElement?.classList.remove('nav-custom-dark');
            setSwitch1(false);
        }

        // Guardar el tema actual en localStorage
        localStorage.setItem('theme', theme);

    }, [theme]);

    const changeTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // Devolver un array o un objeto con los valores que quieres utilizar en el componente principal
    return { theme, switch1, changeTheme };
};
