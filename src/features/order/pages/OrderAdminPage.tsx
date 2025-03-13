import { Container } from '@mui/material';
import OrderTableAdmin from '../components/OrderTableAdmin';

function OrderAdminPage() {
    return (
        <Container sx={{ marginLeft: 35 }}>
            <OrderTableAdmin />
        </Container>
    );
}

export default OrderAdminPage;
