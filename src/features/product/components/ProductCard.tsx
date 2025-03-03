import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

interface IProductCardProps {
    product: IProduct;
}
export default function ProductCard({ product }: IProductCardProps) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                title={product.name}
                // subheader='September 14, 2016'
            />
            <CardMedia
                component='img'
                height='194'
                image={`${import.meta.env.VITE_BACKEND_URL}/images/products/${
                    product.main_image
                }`}
                alt='Paella dish'
            />
            <CardContent>
                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                    {product.shortDescription}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button>Detail</Button>
            </CardActions>
        </Card>
    );
}
