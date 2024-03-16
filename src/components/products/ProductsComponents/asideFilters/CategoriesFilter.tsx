import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';


export default function CategoriesFilter() {
    const [searchParams, setSearchParams] = useSearchParams()

    return (
        <div>
            <RadioGroup
                aria-labelledby="categories-buttons-group-label"
                defaultValue="Skincare"
                name="category"
                onChange={(e, newValue) => {
                    if (newValue != "") {
                        searchParams.set("category", newValue);
                        setSearchParams(searchParams)
                    } else {
                        searchParams.delete("category");
                        setSearchParams(searchParams)
                    }

                }}
            >
                <FormControlLabel value="" checked={ !searchParams.get("category") ? true : false} control={<Radio />} label="All Categories" />
                <FormControlLabel value="65e7d89b62bb29693a0d1c58" checked={searchParams.get("category") == "65e7d89b62bb29693a0d1c58" ? true : false} control={<Radio />} label="Skincare" />
                <FormControlLabel value="65e7d89c62bb29693a0d1c5d" checked={searchParams.get("category") == "65e7d89c62bb29693a0d1c5d" ? true : false} control={<Radio />} label="Watches" />
                <FormControlLabel value="65e7d89c62bb29693a0d1c5f" checked={searchParams.get("category") == "65e7d89c62bb29693a0d1c5f" ? true : false} control={<Radio />} label="Jewellery" />
                <FormControlLabel value="65e7d89c62bb29693a0d1c5b" checked={searchParams.get("category") == "65e7d89c62bb29693a0d1c5b" ? true : false} control={<Radio />} label="Handbags" />
                <FormControlLabel value="65e7d89c62bb29693a0d1c61" checked={searchParams.get("category") == "65e7d89c62bb29693a0d1c61" ? true : false} control={<Radio />} label="Eyewear" />
            </RadioGroup>
        </div>
    );
}