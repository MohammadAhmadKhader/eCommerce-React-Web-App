import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import EditReview from './EditReview';
import { useContext } from 'react';
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider';
import { UserContext } from '../../features/UserFeature/UserProvider';

export default function EditReviewModal({ isEditReviewModalOpen, setIsEditReviewModalOpen,review }) {
    const { theme } = useContext(ThemeContext);
    const {userData} = useContext(UserContext);
    return (
        <>
            <Modal
                aria-labelledby="Edit Review"
                aria-describedby="Edit user's review"
                open={isEditReviewModalOpen}
                onClose={() => setIsEditReviewModalOpen(false)}
                sx={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center',

                }}
                hideBackdrop

            >
                <Sheet
                    variant="plain"
                    sx={{
                        maxWidth: 800,
                        width: "95%",
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                        backgroundColor: theme === "dark" ? "var(--dark--bg--color)" : "var(--light--bg--color)",
                        color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)"
                    }}
                >
                    <ModalClose variant="plain" sx={{ m: 1 }} />
                    <Typography
                        component="h2"
                        id="modal-title"
                        level="h4"
                        textColor="inherit"
                        fontWeight="lg"
                        mb={1}
                    >
                        Edit Review
                    </Typography>
                    <EditReview review={userData ? review : undefined} setIsEditReviewModalOpen={setIsEditReviewModalOpen}/>
                </Sheet>
            </Modal>
        </>
    );
}