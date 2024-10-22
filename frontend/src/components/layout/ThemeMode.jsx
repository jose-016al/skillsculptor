import { ToggleSwitch } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

export const ThemeMode = () => {

  const { switch1, changeTheme } = useTheme();

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
