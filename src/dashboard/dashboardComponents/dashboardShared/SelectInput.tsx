import { FocusEvent, KeyboardEvent, MouseEvent, useContext, useState } from 'react'
import Select, { selectClasses, } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { SxProps } from '@mui/joy/styles/types';
import { ThemeContext } from '../../../components/features/ThemeFeature/ThemeProvider';
import { Divider } from '@mui/joy';

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
  disabledOption?: boolean;
  disabledText?: string;
}
function SelectInput({ handleChange, width = 220, optionsArray, optionValue, optionName,
  name, placeholder, className, defaultValue = undefined, disabledOption, disabledText = "-- Sort options --" }: ISelectInput) {
  const [selectValue, setSelectValue] = useState<string>(defaultValue);
  const { theme } = useContext(ThemeContext);

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
      slotProps={{
        listbox: {
          sx: {
            paddingTop: disabledOption && "0px",
            borderColor: "var(--accent-color)",
            backgroundColor: theme === "dark" ? "var(--dark--bg--color)" : "var(--light--bg--color)",
            color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)",
          }
        },
        indicator: {
          className: "text-color-accent"
        },
        button: {
          sx: {
            color: "var(--accent-color)"
          }
        },
      }}
      sx={{
        width: width,
        backgroundColor: theme === "dark" ? "var(--dark--bg--color)" : "var(--light--bg--color)",
        color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)",
        borderColor: "var(--accent-color)",
        [`& .${selectClasses.indicator}`]: {
          transition: '0.2s',
          [`&.${selectClasses.expanded}`]: {
            transform: 'rotate(-180deg)',
          },
        },
        ':hover': {
          backgroundColor: theme === "dark" ? "var(--dark--bg--color)" : "var(--light--bg--color)",
        }

      }}>
      {disabledOption && <Option value={undefined} className='color-red-200 w-full justify-center' disabled sx={{
        sx: {
          textAlign: "center"
        }
      }}>
        {disabledText}
      </Option>}
      {disabledOption && <Divider />}
      {optionsArray.map((option: object,index) => {
        return <Option
          key={index}
          color="primary"
          value={option[optionValue]}
          sx={{
            backgroundColor: theme === "dark" ? "var(--dark--bg--color)" : "var(--light--bg--color)",
            color: "var(--accent-color)",
            "&.MuiOption-root,&.MuiOption-highlighted:not([aria-selected='true'])": {
              backgroundColor: "inherit",
              ":hover": {
                backgroundColor: theme === "dark" ? "var(--dark--hover--tabs)" : "var(--light--hover--tabs)",
              }
            },

            "&.Mui-selected": {
              backgroundColor: theme === "dark" ? "var(--dark--selected--tabs)" : "var(--light--selected--tabs)",

              ":hover": {
                backgroundColor: theme === "dark" ? "var(--dark--hover--selected--tabs)" : "var(--light--hover--selected--tabs)",
              }
            },
            ":hover": {
              backgroundColor: theme === "dark" ? "var(--dark--bg--color)" : "var(--light--bg--color)",
            }

          }}

        >
          {option[optionName]}</Option>
      })}

    </Select >
  )
}

export default SelectInput