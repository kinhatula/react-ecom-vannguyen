import Carousel from '@/components/Carousel';
import { getGalleries, getMainImage } from '@/utils/product.utils';
import { Box } from '@mui/material';

interface IProductCarouselProps {
    product: IProduct;
}
function ProductCarousel({ product }: IProductCarouselProps) {
    return (
        <Box padding={5}>
            <Carousel
                items={[getMainImage(product), ...getGalleries(product)]}
            />
        </Box>
    );
}

export default ProductCarousel;
