import { ToggleSwitch } from 'flowbite-react';
import React, { useEffect, useState } from 'react';

export const ThemeMode = () => {
  const [theme, setTheme] = useState('dark');
  const [switch1, setSwitch1] = useState(true); // Inicializa en true para que el toggle esté en "dark"

  useEffect(() => {
    // Cambia la clase de 'dark' en el HTML según el tema
    if (theme === 'dark') {
      document.querySelector('html')?.classList.add('dark');
      setSwitch1(true); // Asegúrate de que el switch esté en "on" si el tema es oscuro
    } else {
      document.querySelector('html')?.classList.remove('dark');
      setSwitch1(false); // Asegúrate de que el switch esté en "off" si el tema es claro
    }
  }, [theme]);

  const changeTheme = () => {
    // Cambia el tema y el estado del switch
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <div className="flex max-w-md flex-col items-start gap-4">
      <ToggleSwitch
        checked={switch1}
        label="Modo oscuro"
        onChange={changeTheme}
      />
    </div>
  );
};