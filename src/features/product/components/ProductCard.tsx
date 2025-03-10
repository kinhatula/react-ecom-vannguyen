import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

interface IProductCardProps {
    product: IProduct;
}
export default function ProductCard({ product }: IProductCardProps) {
    const navigate = useNavigate();
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader title={product.name} subheader={`${product.price}$`} />
            <Link to={`/products/${product.id}`}>
                <CardMedia
                    component='img'
                    height='100%'
                    image={`${
                        import.meta.env.VITE_BACKEND_URL
                    }/images/products/${product.main_image}`}
                    alt='Paella dish'
                />
            </Link>
            <CardContent>
                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                    {product.shortDescription}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button onClick={() => navigate(`/products/${product.id}`)}>
                    Detail
                </Button>
            </CardActions>
        </Card>
    );
}
