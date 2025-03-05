import { Grid2 as Grid } from '@mui/material';

import { useParams } from 'react-router-dom';
import useProductQuery from '../hooks/useProductQuery ';
import ProductCarousel from './ProductCarousel';
import ProductInfo from './ProductInfo';
function ProductDetailContainer() {
    const { id } = useParams();
    const productId = parseInt(id || '1');
    const { data } = useProductQuery(productId);
    const product = data.data;

    return (
        <Grid container spacing={2}>
            <Grid size={4}>
                <ProductCarousel product={product} />
            </Grid>
            <Grid size={8}>
                <ProductInfo  product={product}/>
            </Grid>
        </Grid>
    );
}

export default ProductDetailContainer;
