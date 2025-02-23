import { useState } from 'react';
import SignUp from '../components/SignUp';
import { SnackbarCloseReason } from '@mui/material';
import Toast from '@/components/Toast';

function SignUpPage() {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    return (
        <div>
            <SignUp
                open={open}
                handleClick={handleClick}
                handleClose={handleClose}
            />
            <Toast
                open={open}
                handleClick={handleClick}
                handleClose={handleClose}
            />
        </div>
    );
}

export default SignUpPage;
