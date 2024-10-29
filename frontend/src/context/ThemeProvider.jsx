import React, { createContext, useContext, useEffect, useState } from 'react';
import AuthContext from './AuthProvider'

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    // Colores disponibles
    const availableColors = [
        {
            bg: 'bg-blue-700',
            hover: 'hover:bg-blue-500',
            text: 'text-blue-700',
            ring: 'ring-blue-500',
            border: 'border-blue-500',
            focusRing: 'focus:ring-blue-500',
            focusBorder: 'focus:border-blue-500'
        },
        {
            bg: 'bg-green-700',
            hover: 'hover:bg-green-500',
            text: 'text-green-700',
            ring: 'ring-green-500',
            border: 'border-green-500',
            focusRing: 'focus:ring-green-500',
            focusBorder: 'focus:border-green-500'
        },
        {
            bg: 'bg-red-700',
            hover: 'hover:bg-red-500',
            text: 'text-red-700',
            ring: 'ring-red-500',
            border: 'border-red-500',
            focusRing: 'focus:ring-red-500',
            focusBorder: 'focus:border-red-500'
        },
        {
            bg: 'bg-pink-600',
            hover: 'hover:bg-pink-500',
            text: 'text-pink-700',
            ring: 'ring-pink-500',
            border: 'border-pink-500',
            focusRing: 'focus:ring-pink-500',
            focusBorder: 'focus:border-pink-500'
        },
        {
            bg: 'bg-orange-500',
            hover: 'hover:bg-orange-400',
            text: 'text-orange-500',
            ring: 'ring-orange-500',
            border: 'border-orange-500',
            focusRing: 'focus:ring-orange-500',
            focusBorder: 'focus:border-orange-500'
        },
        {
            bg: 'bg-yellow-400',
            hover: 'hover:bg-yellow-300',
            text: 'text-yellow-400',
            ring: 'ring-yellow-400',
            border: 'border-yellow-400',
            focusRing: 'focus:ring-yellow-400',
            focusBorder: 'focus:border-yellow-400'
        }
    ];

    const { auth, loading } = useContext(AuthContext);
    const [theme, setTheme] = useState('dark');
    const [primaryColor, setPrimaryColor] = useState(availableColors[0]);
    const [switch1, setSwitch1] = useState(theme === 'dark');


    useEffect(() => {
        if (!loading && auth?.theme) {
            setTheme(auth.theme.mode || 'dark');
            setPrimaryColor(auth.theme.color || availableColors[0]);
        }
    }, [loading, auth]);

    useEffect(() => {
        const htmlElement = document.querySelector('html');

        if (theme === 'dark') {
            htmlElement?.classList.add('dark');
            setSwitch1(true);
        } else {
            htmlElement?.classList.remove('dark');
            setSwitch1(false);
        }
    }, [theme]);

    const changeTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const changeColor = (color) => {
        setPrimaryColor(color);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, primaryColor, setPrimaryColor, switch1, changeTheme, changeColor, availableColors }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
