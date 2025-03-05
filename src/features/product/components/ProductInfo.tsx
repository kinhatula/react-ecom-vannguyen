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

interface IProductInfo {
    product: IProduct;
}

function ProductInfo({ product }: IProductInfo) {
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
                value={4}
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
                <IconButton>
                    <MinimizeIcon />
                </IconButton>
                <TextField type='text' sx={{ width: 100 }}></TextField>
                <IconButton>
                    <AddIcon />
                </IconButton>
            </Stack>
            <Button variant='contained' color='warning'>
                Add to cart
            </Button>
        </Box>
    );
}

export default ProductInfo;
