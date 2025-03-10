import { Grid2 as Grid } from '@mui/material';

import { useParams } from 'react-router-dom';
import useProductQuery from '../hooks/useProductQuery ';
import ProductCarousel from './ProductCarousel';
import ProductInfo from './ProductInfo';
import { useState } from 'react';
import useAddToCart from '@/features/cart/hooks/useAddToCart';
function ProductDetailContainer() {
    //router dom
    const { id } = useParams();
    const productId = parseInt(id || '1');
    //react query
    const addToCartMutation = useAddToCart();

    const { data } = useProductQuery(productId);
    const product = data.data;

    //react
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        addToCartMutation.mutate({
            productId,
            quantity
        });
    };

    return (
        <Grid container spacing={2}>
            <Grid size={4}>
                <ProductCarousel product={product} />
            </Grid>
            <Grid size={8}>
                <ProductInfo
                    product={product}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    handleAddToCart={handleAddToCart}
                />
            </Grid>
        </Grid>
    );
}

export default ProductDetailContainer;
