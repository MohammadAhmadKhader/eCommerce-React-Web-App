import { useContext, useState } from 'react'
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import { FaChevronRight } from 'react-icons/fa';
import Input from '../../shared/Input';
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from "yup"
import { Address } from '../../../types/types';


const schema = yup
    .object({
        street: yup.string().min(4, "Minimum characters allowed is 4").max(64, "Max characters allowed is 64").required(),
        fullName: yup.string().min(4, "Minimum characters allowed is 4").max(32, "Max characters allowed is 32").required(),
        state: yup.string().min(4, "Minimum characters allowed is 4").max(32, "Max characters allowed is 32").required(),
        city: yup.string().min(3, "Minimum characters allowed is 3").max(32, "Max characters allowed is 64").required(),
        mobileNumber: yup.string().min(6, "Minimum characters allowed is 4").max(15, "Max characters allowed is 64").required(),
        pinCode: yup.string().min(2, "Minimum characters allowed is 2").max(12, "Max characters allowed is 64").required(),
    })

function NewAddress() {
    const { theme } = useContext(ThemeContext)
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };


    const {
        register,
        trigger,
        handleSubmit,
        formState: { errors },
    } = useForm<Address>({
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<Address> = (data) => {
        console.log(data)
    }
    return (
        <div>
            <List
                sx={{}}
                component="nav"
                aria-labelledby="nested-list-subheader"
                style={{
                    backgroundColor: theme === "dark" ? "var(--dark--bg--color)" : "var(--light--bg--color)",
                    color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)"
                }}>

                <ListItemButton onClick={handleClick}
                    disableRipple
                    sx={{
                        borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
                        borderBottomWidth: "1px",
                        borderStyle: "solid",
                        paddingInline: "0px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        '&:hover': {
                            backgroundColor: 'transparent'
                        }
                    }}>

                    <h3 className='text-2xl py-1'>Add New Address</h3>
                    <div className={`duration-500 ${open ? "rotate-90" : "rotate-0"}`}>
                        <FaChevronRight size={20} />
                    </div>

                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <form className='my-5' onSubmit={handleSubmit(onSubmit)}>
                        <div className='grid grid-cols-12 gap-x-4'>
                            <Input parentCustomClass='col-span-6' id='name' placeholder='Enter Name' title='Full Name'
                                type='text' name="fullName" register={register} trigger={trigger} errors={errors} />
                            <Input parentCustomClass='col-span-6' id='mobileNumber' placeholder='Enter Mobile Number'
                                title='Mobile Number' type='text' name="mobileNumber" register={register} errors={errors} trigger={trigger} />
                            <Input parentCustomClass='col-span-6' id='street' placeholder='Enter Address'
                                title='Street Address' type='text' name="street" register={register} errors={errors} trigger={trigger} />
                            <Input parentCustomClass='col-span-6' id='state' placeholder='Enter State'
                                title='State' type='text' name="state" register={register} errors={errors} trigger={trigger} />
                            <Input parentCustomClass='col-span-6' id='city' placeholder='Enter City'
                                title='City' type='text' name="city" register={register} errors={errors} trigger={trigger} />
                            <Input parentCustomClass='col-span-6' id='pinCode' placeholder='Enter Pin Code'
                                title='Pin Code' type='text' name="pinCode" register={register} errors={errors} trigger={trigger} />
                        </div>
                        <button
                            type='submit'
                            className='bg-color-accent text-white rounded-md px-4 py-1 duration-300 hover:bg-transparent hover:text-color-accent border border-color-accent'>
                            Add Address
                        </button>
                    </form>
                </Collapse>
            </List>
        </div>
    )
}

export default NewAddress