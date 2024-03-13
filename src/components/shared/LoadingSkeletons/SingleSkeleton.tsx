import Stack from '@mui/joy/Stack';
import Card from '@mui/joy/Card';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';
import { AspectRatio } from '@mui/joy';
import { useContext } from 'react';
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider';

function SingleSkeleton() {
    const { theme } = useContext(ThemeContext)
    return (
        <Stack spacing={2} useFlexGap>
            <Card variant="outlined" sx={{
                bgcolor: theme == "dark" ? "var(--dark--bgCard-color)" : "var(--light--bgCard-color)",
                borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
                color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)"
            }}>
                <AspectRatio ratio="21/9">
                    <Skeleton>
                    </Skeleton>
                </AspectRatio>
                <Typography>
                    <Skeleton>
                        aiores ab vero itaque tempore consectet
                        ligendi ducimus temporibus. Assumenda dignissi
                        t, a reprehenderit
                        autem maxime praesentium molestia
                    </Skeleton>
                </Typography>
            </Card>
        </Stack>
    )
}

export default SingleSkeleton