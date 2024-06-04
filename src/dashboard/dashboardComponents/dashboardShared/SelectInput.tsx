import { FocusEvent, KeyboardEvent, MouseEvent, useState } from 'react'
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { SxProps } from '@mui/joy/styles/types';
import { RegisterOptions } from 'react-hook-form';

interface ISelectInput {
  optionsArray: object[];
  optionValue: any;
  optionName: any;
  handleChange?: (event: KeyboardEvent | MouseEvent | FocusEvent, value: any) => void;
  width?: number | string;
  name?: string | undefined;
  style?: SxProps;
  className?: string;
  placeholder?: string;
  defaultValue?: any;
}
function SelectInput({ handleChange, width = 220, optionsArray, optionValue, optionName, name, placeholder, className, defaultValue = undefined }: ISelectInput) {
  const [selectValue, setSelectValue] = useState<string>(defaultValue);

  return (
    <Select name={name} value={selectValue}
      onChange={(e, value) => {
        setSelectValue(value);
        handleChange(e, value)
      }}
      className={`flex xl:w-auto ${className || ""}`}
      defaultValue={defaultValue}
      placeholder={placeholder}
      indicator={<KeyboardArrowDown />}
      sx={{
        width: width,
        [`& .${selectClasses.indicator}`]: {
          transition: '0.2s',
          [`&.${selectClasses.expanded}`]: {
            transform: 'rotate(-180deg)',
          },
        },

      }}>

      {optionsArray.map((option: object) => {
        return <Option value={option[optionValue]}>{option[optionName]}</Option>
      })}

    </Select>
  )
}

export default SelectInput