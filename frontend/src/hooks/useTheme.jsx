import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';

export const useTheme = () => {

    const {auth} = useAuth();
    // Establece el tema y el color desde 'auth' o usa los valores por defecto
    const [theme, setTheme] = useState(() => auth?.theme?.mode || 'dark');
    const [primaryColor, setPrimaryColor] = useState(() => auth?.theme?.color || 'red-700');
    const [switch1, setSwitch1] = useState(theme === 'dark');

    // Colores disponibles
    const availableColors = [
        'blue-700', 
        'green-700', 
        'red-700', 
        'pink-600', 
        'orange-600', 
        'yellow-400'];

    useEffect(() => {
        // Actualiza la clase del tema en el HTML
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
    }, [theme]);

    const changeTheme = () => {
        // Cambia entre 'light' y 'dark'
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const changeColor = (color) => {
        // Cambia el color primario
        setPrimaryColor(color);
    };

    // Devolver el estado y la lista de colores disponibles
    return { theme, primaryColor, switch1, changeTheme, changeColor, availableColors };
};
