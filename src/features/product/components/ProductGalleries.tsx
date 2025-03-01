import { useParams } from 'react-router-dom';
import { Box, Button, Input, Typography } from '@mui/material';
import GalleriesDataGrid from './GalleriesDataGrid';

function ProductGalleries() {
    const { productId } = useParams();

    return (
        <div>
            <Typography variant='h4'>Product Name : {productId}</Typography>

            <Input type='file' inputProps={{ multiple: true }} sx={{ mt: 1 }} />
            <Box sx={{ mt: 1 }}></Box>
            <Button variant='contained'>Submit</Button>

            <GalleriesDataGrid productId={productId || '1'} />
        </div>
    );
}

export default ProductGalleries;
