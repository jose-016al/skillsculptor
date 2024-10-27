import React, { useEffect, useState } from 'react';
import { Checkbox, Datepicker } from 'flowbite-react';

export const Dates = ({ setDate, rangeDatePicker }) => {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [isChecked, setIsChecked] = useState(false);

    const now = new Date();
    const minDate = new Date(now.getFullYear() - 70, now.getMonth(), now.getDate()); // 70 años atrás

    useEffect(() => {
        formatDateToString();
    }, [startDate, endDate, isChecked, rangeDatePicker]);

    const formatDateToString = () => {
        if (rangeDatePicker) {
            if (startDate && endDate) {
                if (isChecked) {
                    setDate(`${startDate.toLocaleString('es-ES', { month: 'long' })}/${startDate.getFullYear()} - Actualmente`);
                } else {
                    setDate(`${startDate.toLocaleString('es-ES', { month: 'long' })}/${startDate.getFullYear()} - ${endDate.toLocaleString('es-ES', { month: 'long' })}/${endDate.getFullYear()}`);
                }
            }
        } else {
            if (endDate) {
                if (isChecked) {
                    setDate("Actualmente");
                } else {
                    setDate(`${endDate.getFullYear()}`);
                }
            }
        }
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
        if (endDate && date > endDate) {
            setEndDate(date);
        }
    };

    const handleEndDateChange = (date) => {
        if (date < startDate) {
            setStartDate(date);
        }
        setEndDate(date);
    };

    const handleCheckboxChange = () => {
        setIsChecked((prev) => !prev);
        if (!isChecked) {
            setEndDate(now);
        }
    };

    if (rangeDatePicker) {
        return (
            <div className='flex flex-col md:flex-row md:space-x-4'>
                <div className='md:w-1/2'>
                    <div>
                        <label htmlFor="start-date" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">
                            Fecha de inicio
                        </label>
                        <Datepicker
                            value={startDate}
                            language="es-ES"
                            minDate={minDate}
                            maxDate={now}
                            weekStart={1}
                            onChange={handleStartDateChange}
                        />
                    </div>
                </div>

                <div className='md:w-1/2'>
                    <div>
                        <label htmlFor="end-date" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">
                            Fecha de fin
                        </label>
                        <Datepicker
                            language="es-ES"
                            weekStart={1}
                            minDate={minDate}
                            maxDate={now}
                            value={isChecked ? now : endDate}
                            onChange={handleEndDateChange}
                            disabled={isChecked}
                        />
                    </div>

                    <div className='flex space-x-2 items-center'>
                        <Checkbox
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            label="Actualmente"
                        />
                        <label htmlFor="currently" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">
                            Actualmente
                        </label>
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
                    weekStart={1}
                    minDate={minDate}
                    maxDate={now}
                    value={isChecked ? now : endDate}
                    onChange={handleEndDateChange}
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
