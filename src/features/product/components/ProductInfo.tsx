import {
    Box,
    Button,
    IconButton,
    Rating,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MinimizeIcon from '@mui/icons-material/Minimize';
import useProductReviewQuery from '../hooks/useProductReviewQuery';

interface IProductInfo {
    product: IProduct;
    quantity: number;
    setQuantity: (quantity: number) => void;
    handleAddToCart: () => void;
}

function ProductInfo({
    product,
    quantity,
    setQuantity,
    handleAddToCart
}: IProductInfo) {
    const handleDeCrement = () => {
        if (quantity <= 1) {
            setQuantity(1);
            return;
        }
        setQuantity(quantity - 1);
    };

    const { data } = useProductReviewQuery(product.id);
    const reviewStar = data.data;

    const handleInCrement = () => {
        setQuantity(quantity + 1);
    };

    return (
        <Box padding={5}>
            <Typography
                variant='h4'
                sx={{ fontWeight: 'bold', marginBottom: 1 }}
            >
                {product.name}
            </Typography>
            <Rating
                name='read-only'
                value={reviewStar}
                readOnly
                sx={{ marginBottom: 4 }}
            />
            <Typography
                variant='h5'
                sx={{ fontWeight: 'bold', marginBottom: 2 }}
            >
                Price: {product.price}$
            </Typography>
            <p style={{ fontSize: '20px' }}>{product.longDescription}</p>
            <Stack direction={'row'} sx={{ mb: 3 }}>
                <IconButton onClick={handleDeCrement}>
                    <MinimizeIcon />
                </IconButton>
                <TextField
                    type='text'
                    sx={{ width: 100 }}
                    value={quantity}
                ></TextField>
                <IconButton onClick={handleInCrement}>
                    <AddIcon />
                </IconButton>
            </Stack>
            <Button
                variant='contained'
                color='warning'
                onClick={handleAddToCart}
            >
                Add to cart
            </Button>
        </Box>
    );
}

export default ProductInfo;
