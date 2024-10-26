import { ToggleSwitch } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

export const ThemeMode = () => {

  const { switch1, changeTheme } = useTheme();

  return (
    <div className='flex justify-center'>
      <ToggleSwitch
        className='flex flex-row-reverse items-center gap-5'
        checked={switch1}
        label="Modo oscuro"
        onChange={changeTheme}
      />
    </div>
  );
};
