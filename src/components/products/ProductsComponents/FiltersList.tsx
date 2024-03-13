import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider';
import { IFiltersListProps } from '../../../types/types';

function FiltersList({ FilterComponent, title }: IFiltersListProps) {
  const { theme } = useContext(ThemeContext)
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <List
      sx={{ width: '100%' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      style={{
        backgroundColor: theme === "dark" ? "var(--dark--bg--color)" : "var(--light--bg--color)",
        color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)"
      }}

    >
      <ListItemButton onClick={handleClick} sx={{
        borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
        borderBottomWidth: "1px",
        borderStyle: "solid",
        paddingInline: "0px"
      }}
      >

        <ListItemText primary={title} />
        {open ? <RemoveIcon /> : <AddIcon />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {<FilterComponent />}
      </Collapse>
    </List>
  );
}

export default FiltersList