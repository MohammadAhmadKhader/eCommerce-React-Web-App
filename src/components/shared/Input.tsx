/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useContext } from 'react'
import { ThemeContext } from '../features/ThemeFeature/ThemeProvider';
import { IInputProps } from '../../types/types';


function Input({ register, type = "text", name, id, title, placeholder, errors, trigger, parentCustomClass, minDate = undefined, maxDate = undefined,className="",defaultValue=undefined,precision=undefined}: IInputProps) {
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`flex flex-col mb-4 ${parentCustomClass}`}>
            <label htmlFor={id}>{title}</label>
            <input {...register(name)} id={id} placeholder={placeholder} type={type} name={name} max={maxDate} min={minDate}
                className={`rounded-md py-1 mb-1 mt-1 bg-transparent border px-2 ${className}`} step={precision}
                style={{ borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)" }}
                onBlur={() => {
                    if (trigger) {
                        trigger([name])
                    }
                }}
                defaultValue={defaultValue}
            />
            {errors && <span className='text-red-600 text-xs ms-1'>{errors[name]?.message}</span>}
        </div>
    )
}

export default Input