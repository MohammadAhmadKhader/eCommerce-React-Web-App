import Checkbox from '@mui/material/Checkbox';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../../features/ThemeFeature/ThemeProvider';
import { ICheckboxInputProps } from '../../../../types/types';
import { useSearchParams } from 'react-router-dom';


function CheckboxInput({ id, text, handleCheckBox,stateController }: ICheckboxInputProps) {
    const [isChecked, setIsChecked] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams()
    const { theme } = useContext(ThemeContext);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        handleCheckBox(event, text)
    };
    useEffect(() => {
        setIsChecked(stateController(text))
    }, [searchParams])
    return (
        <>
            <Checkbox id={`${id}`} sx={{
                color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)",
                '&.Mui-checked': {
                    color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)",
                },
            }} checked={isChecked ? true : false} onChange={handleChange} />
            <label htmlFor={`${id}`}>{text}</label>
        </>
    )
}

export default CheckboxInput

