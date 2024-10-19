import { ToggleSwitch } from 'flowbite-react';
import React, { useEffect, useState } from 'react';

export const ThemeMode = () => {
  const [theme, setTheme] = useState('dark');
  const [switch1, setSwitch1] = useState(true);

  useEffect(() => {
    const htmlElement = document.querySelector('html');
    const customUlElement = document.querySelector('.custom-ul'); // Selecciona el ul con la clase 'custom-ul'

    if (theme === 'dark') {
      htmlElement?.classList.add('dark');
      customUlElement?.classList.add('custom-ul-dark');
      customUlElement?.classList.remove('custom-ul-light'); // Elimina la clase clara
      setSwitch1(true);
    } else {
      htmlElement?.classList.remove('dark');
      customUlElement?.classList.add('custom-ul-light');
      customUlElement?.classList.remove('custom-ul-dark'); // Elimina la clase oscura
      setSwitch1(false);
    }
  }, [theme]);

  const changeTheme = () => {
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
