import { Dispatch, FC, ReactNode, SetStateAction, useContext } from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import { ThemeContext } from '../../../components/features/ThemeFeature/ThemeProvider';
import { SxProps } from '@mui/joy/styles/types';

export interface IEditModal {
    children: ReactNode;
    title: string;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    variant?: "outlined" | "plain" | "solid";
    DialogContentSx?:SxProps
}


export default function EditModal({ children, title, isOpen = false, setIsOpen, variant = "outlined" ,DialogContentSx}: IEditModal) {
    const { theme } = useContext(ThemeContext);

    return (
        <Modal hideBackdrop open={isOpen} onClose={() => setIsOpen(false)}>
            <ModalDialog variant={variant} sx={{
                borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
                backgroundColor: theme == "dark" ? "var(--dark--bgCard-color)" : "var(--light--bgCard-color)",
                color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)",
            }}>
                <ModalClose
                    sx={{
                        transition: "all 300ms",
                        ":hover": {
                            backgroundColor: "var(--accent-color)",
                            color: "white"
                        }
                    }} />
                <DialogTitle>
                    {title}
                </DialogTitle>

                <DialogContent sx={{
                    color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)",
                    backgroundColor: theme == "dark" ? "var(--dark--bgCard-color)" : "var(--light--bgCard-color)",
                    borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
                    ...DialogContentSx
                }}>
                    {children}
                </DialogContent>

            </ModalDialog>
        </Modal>
    );
}