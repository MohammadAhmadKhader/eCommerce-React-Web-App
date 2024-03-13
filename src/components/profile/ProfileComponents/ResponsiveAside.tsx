import List from '@mui/joy/List';
import Modal from '@mui/joy/Modal';
import ModalDialog, { ModalDialogProps } from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import DialogTitle from '@mui/joy/DialogTitle';
import { useContext, useEffect, useState } from 'react';
import Button from '@mui/joy/Button'
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider';
import ProfileAsideOptions from './ProfileAsideOptions';
import LogoutButton from './LogoutButton';
import { WindowWidthContext } from '../../features/WindowWidthFeature/WindowWidthProvider';



function ResponsiveAside() {
    const [layout, setLayout] = useState<ModalDialogProps['layout'] | undefined>(
        undefined,
    );
    const { theme } = useContext(ThemeContext)
    const { windowWidth } = useContext(WindowWidthContext)
    useEffect(() => {
        if (windowWidth >= 768) {
            setLayout(undefined)
        }
    }, [windowWidth])
    return (
        <>
            <Button
                sx={{
                    backgroundColor: "var(--accent-color)"
                }}
                onClick={() => {
                    setLayout('fullscreen');
                }}>
                Profile Sections
            </Button>
            <Modal

                open={!!layout}
                onClose={() => {
                    setLayout(undefined);
                }}
            >
                <ModalDialog layout={layout} sx={{
                    backgroundColor: theme === "dark" ? "var(--dark--bg--color)" : "var(--light--bg--color)",
                    color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)"
                }}>
                    <ModalClose />
                    <DialogTitle>User Profile Navigation</DialogTitle>
                    <List sx={{
                        backgroundColor: theme === "dark" ? "var(--dark--bg--color)" : "var(--light--bg--color)",
                        color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)"
                    }}>
                        <ProfileAsideOptions CustomComponent={LogoutButton} />
                    </List>
                </ModalDialog>
            </Modal>
        </>
    )
}

export default ResponsiveAside