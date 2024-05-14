import { Table } from '@mui/joy'
import { ReactNode, useContext } from 'react';
import { ThemeContext } from '../../../components/features/ThemeFeature/ThemeProvider';

function CustomTable({ children, size = "md",minWidth=700 }: { children: ReactNode, size?: "sm" | "md" | "lg",minWidth?:number }) {
  const { theme } = useContext(ThemeContext);
  // min-width must be 700
  return (
    <Table sx={{
      color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)",
      borderStyle: "solid",
      borderWidth: "1px",
      borderColor: theme == "dark" ? "rgba(var(--dark--tableBorder--color),0.4)" : "rgba(var(--light--tableBorder--color),0.1)",
      minWidth: minWidth,
    }}
      size={`${size}`}

    >
      {children}
    </Table>
  )
}

export default CustomTable