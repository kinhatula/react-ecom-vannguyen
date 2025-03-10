import { Grid2 as Grid } from '@mui/material/';
import CartTable from './CartTable';
import CartSummary from './CartSummary';
function CartContainer() {
    return (
        <Grid container>
            <Grid size={7}>
                <CartTable />
            </Grid>
            <Grid size={5} margin={'auto'}>
                <CartSummary />
            </Grid>
        </Grid>
    );
}

export default CartContainer;
