import React, { useEffect, useState } from 'react'
import { Datepicker } from 'flowbite-react';

export const Dates = ({ setDate, RangeDatePicker }) => {

    const [isChecked, setIsChecked] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [dateLimitStart, setDateLimitStart] = useState(null);
    const [dateLimitEnd, setDateLimitEnd] = useState(null);

    useEffect(() => {
        if (startDate && endDate) {
            setDate(`${startDate} - ${endDate}`);
            console.log(startDate, endDate);
        }
    }, [startDate, endDate, dateLimitStart, dateLimitEnd]);

    const now = new Date();
    const minDate = new Date(now.getFullYear() - 70, now.getMonth(), now.getDate()); // 70 años atrás

    // Cuando solo esta la fecha de fin, para educacion
    const handleDateChangeEndOnly = (value) => {
        const year = value ? value.getFullYear() : null; // Extraer solo el año
        setDate(year);
    };

    // Si se esta estuadiando o trabajando actualmente 
    const handleCheckboxChange = () => {
        setIsChecked((prev) => !prev);
        if (!isChecked) {
            if (RangeDatePicker) {
                setEndDate("Actualmente");
            } else {
                setDate("Actualmente");
            }
        }
    };

    const handleDateChangeStart = (value) => {
        setDateLimitStart(value);
        const dateFormat = value ? `${value.toLocaleString('es-ES', { month: 'long' })}/${value.getFullYear()}` : null;
        setStartDate(dateFormat);
    };

    const handleDateChangeEnd = (value) => {
        setDateLimitEnd(value);
        const dateFormat = value ? `${value.toLocaleString('es-ES', { month: 'long' })}/${value.getFullYear()}` : null;
        setEndDate(dateFormat);
    };

    // Mostrar un solo Datepicker para fecha de fin o mostrar dos para fecha de inicio y fin
    if (RangeDatePicker) {
        return (
            <div className='flex flex-col md:flex-row md:space-x-4'>
                <div className='md:w-1/2'>
                    <div>
                        <label htmlFor="date" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">
                            Fecha de inicio
                        </label>
                        <Datepicker
                            language="es-ES"
                            minDate={minDate}
                            maxDate={dateLimitEnd || now}
                            onChange={handleDateChangeStart}
                        />
                    </div>
                </div>
                <div className='md:w-1/2'>
                    <div>
                        <label htmlFor="date" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">
                            Fecha de finalización
                        </label>
                        <Datepicker
                            language="es-ES"
                            minDate={minDate}
                            maxDate={now}
                            onChange={handleDateChangeEnd}
                            disabled={isChecked}
                        />
                        <div className='flex space-x-2 items-center'>
                            <input
                                type="checkbox"
                                name='date'
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="date" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">
                                Actualmente
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <label htmlFor="date" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">
                    Fecha de finalización
                </label>
                <Datepicker
                    language="es-ES"
                    minDate={minDate}
                    maxDate={now}
                    onChange={handleDateChangeEndOnly}
                    disabled={isChecked}
                />
                <div className='flex space-x-2 items-center'>
                    <input
                        type="checkbox"
                        name='date'
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="date" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">
                        Actualmente
                    </label>
                </div>
            </div>
        )
    }
}
