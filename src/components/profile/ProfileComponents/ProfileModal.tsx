import Modal from '@mui/joy/Modal';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { useContext } from 'react';
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider';

export default function ProfileModal({ blocker }) {
  const { theme } = useContext(ThemeContext)
  return (
    <div style={{
      boxShadow: theme == "dark" ? "var(--dark--boxShadowCard)" : "var(--light--boxShadowCard)",
    }}>
      <Modal
        hideBackdrop
        aria-labelledby="profile modal"
        aria-describedby="warning message about user information change"
        open={true}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
            backgroundColor: theme == "dark" ? "var(--dark--bgCard-color)" : "var(--light--bgCard-color)",
            borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
            color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)",
          }}
        >
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
          >
            Are you sure you want to leave without saving changes ?
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">

            <div className='flex justify-between mt-5'>
              <button className='text-white bg-color-accent border-color-accent px-2.5 py-1 duration-300
               hover:text-color-accent hover:bg-transparent border rounded-md text-[16px] tracking-wide font-semibold' onClick={() => {
                  blocker.proceed()
                }}>Proceed</button>
              <button className='text-white bg-color-accent border-color-accent px-2.5 py-1 duration-300 
              hover:text-color-accent hover:bg-transparent border rounded-md text-[16px] tracking-wide font-semibold' onClick={() => {
                  blocker.reset()
                }}>Cancel</button>
            </div>
          </Typography>
        </Sheet>
      </Modal>
    </div>
  )
}


