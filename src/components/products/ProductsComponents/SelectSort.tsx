import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function SelectSort() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null,
  ) => {
    setSelectedValue(newValue)
  };
  useEffect(() => {
    if(searchParams.get("sort")){
      setSelectedValue(searchParams.get("sort"))
    }
  }, [])
  useEffect(() => {
    if(selectedValue){
      searchParams.set("sort",selectedValue)
      setSearchParams(searchParams)
    }
  }, [selectedValue]);
  return (
    <Select value={selectedValue ? selectedValue : undefined} onChange={handleChange}
      className='flex xl:w-auto'
      placeholder="Select sort"
      indicator={<KeyboardArrowDown />}
      sx={{
        width: 220,
        [`& .${selectClasses.indicator}`]: {
          transition: '0.2s',
          [`&.${selectClasses.expanded}`]: {
            transform: 'rotate(-180deg)',
          },
        },

      }}>

      <Option value="price_asc" >Price low to high</Option>
      <Option value="price_desc">Price high to low</Option>
      <Option value="ratings_desc">Consumer Ratings</Option>
      <Option value="ratingNumbers_desc">Popularity</Option>
    </Select>
  );
}