import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent
} from '@mui/material';
import { useAppSelector } from '@/redux/hook';
import useProfileAddressQuery from '@/features/user/hooks/useProfileAddressQuery';
import useCheckout from '../hooks/useCheckout';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

interface ICheckoutModalProps {
    open: boolean;
    handleClose: () => void;
}

export default function CheckoutModal({
    open,
    handleClose
}: ICheckoutModalProps) {
    //react
    const [addressId, setAddressId] = useState('');
    // redux
    const { user } = useAppSelector((state) => state.user);
    // react query
    const { data } = useProfileAddressQuery(user.id);
    const checkoutMutation = useCheckout(handleClose);

    const addresses = data.data;

    const handleChange = (event: SelectChangeEvent) => {
        setAddressId(event.target.value as string);
    };

    useEffect(() => {
        if (addresses?.length > 0) {
            setAddressId(addresses[0].id.toString()); // Convert id to string
        }
    }, [addresses]);

    const handleCheckoutConfirm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        checkoutMutation.mutate({ addressId: parseInt(addressId) });
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={style}>
                    <Typography
                        id='modal-modal-title'
                        variant='h6'
                        component='h2'
                    >
                        Please choose address
                    </Typography>
                    <FormControl
                        fullWidth
                        component={'form'}
                        onSubmit={handleCheckoutConfirm}
                    >
                        <InputLabel id='demo-simple-select-label'>
                            Address
                        </InputLabel>
                        <Select
                            sx={{ mb: 2 }}
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={addressId}
                            label='Address'
                            onChange={handleChange}
                            defaultValue={'sdsdsdsd'}
                        >
                            {addresses?.map((address) => (
                                <MenuItem key={address.id} value={address.id}>
                                    {address.street} - {address.country}
                                </MenuItem>
                            ))}
                        </Select>
                        <Button variant='contained' type='submit'>
                            Checkout
                        </Button>
                    </FormControl>
                </Box>
            </Modal>
        </div>
    );
}
