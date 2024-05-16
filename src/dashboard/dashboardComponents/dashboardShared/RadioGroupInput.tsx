import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ChangeEvent, useContext } from 'react'
import { ThemeContext } from '../../../components/features/ThemeFeature/ThemeProvider';

export interface IRadioGroupInput {
    optionsArray: {
        id: string | number;
        isChecked: boolean;
        value: string | number;
        label: string;
    }[];
    defaultValue: string | number;
    value: any;
    name: string;
    ariaLabelledby: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
}

function RadioGroupInput({ optionsArray, defaultValue, onChange, ariaLabelledby, name, value }: IRadioGroupInput) {
    const { theme } = useContext(ThemeContext);
    return (
        <RadioGroup
            aria-labelledby={ariaLabelledby}
            defaultValue={defaultValue}
            value={value}
            name={name}
            onChange={onChange}>
            {optionsArray.map((option) => {
                return (
                    <FormControlLabel key={option.id} value={option.value} defaultChecked={option.isChecked} control={<Radio sx={{
                        color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)",
                        '&.Mui-checked': {
                            color: "var(text-color-accent)",
                        },
                    }} />
                    } label={option.label} />
                )
            })


            }
        </RadioGroup>
    )
}

export default RadioGroupInput