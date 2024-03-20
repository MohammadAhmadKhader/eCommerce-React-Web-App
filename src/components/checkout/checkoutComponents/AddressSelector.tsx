import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { UserContext } from '../../features/UserFeature/UserProvider';


export default function AddressSelector() {
    const { theme } = useContext(ThemeContext)
    const { userData } = useContext(UserContext)
    const [address, setAddress] = useState(null);
    
    return (
        <div className='w-full bg-opacity-5 mt-4' style={{
            color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)",
            backgroundColor: theme === "dark" ? "var(--dark--bg--color)" : "var(--light--bg--color)",

        }}>
            <Select
                placeholder="Select an address"
                name="foo"
                required
                sx={{
                    minWidth: 200,
                    bgcolor: theme === "dark" ? "var(--dark--bg--color)" : "var(--light--bg--color)",
                    color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)",
                    transition: "0.4s",
                    "&:hover": {
                        bgcolor: theme === "dark" ? "var(--dark--bg--color)" : "var(--light--bg--color)",
                        opacity: "0.85"
                    }
                }}
                onChange={(event, newValue) => {
                    console.log(newValue)
                    setAddress(userData.addresses[Number(newValue)])
                }}
            >
                {userData.addresses.map((address, index) => {
                    return (
                        <Option key={address._id} value={index}>{address.state}, {address.city}, {address.streetAddress}



                        </Option>
                    )
                })}
            </Select>
        </div>
    );
}

