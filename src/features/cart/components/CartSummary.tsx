import { Button, Stack, Typography } from '@mui/material';
import useCartQuery from '../hooks/useCartQuery';
import { useState } from 'react';
import CheckoutModal from './CheckoutModal';

function CartSummary() {
    // react
    const [openCheckout, setOpenCheckout] = useState(false);
    const handleOpenCheckout = () => setOpenCheckout(true);
    const handleCloseCheckout = () => setOpenCheckout(false);
    // query
    const { data } = useCartQuery();
    const cart = data.data;

    const handleCheckout = () => {
        handleOpenCheckout();
    };

    return (
        <Stack justifyContent={'center'} alignItems={'center'} spacing={2}>
            <Typography variant='h4'>
                Total Price : {cart.totalPrice}$
            </Typography>
            <Button
                variant='contained'
                onClick={handleCheckout}
                disabled={cart.cartItems.length === 0}
            >
                Process to Check Out
            </Button>
            <CheckoutModal
                open={openCheckout}
                handleClose={handleCloseCheckout}
            />
        </Stack>
    );
}

export default CartSummary;
