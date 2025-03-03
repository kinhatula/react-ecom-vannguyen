import { useParams } from 'react-router-dom';
import { Box, Button, Input, Typography } from '@mui/material';
import GalleriesDataGrid from './GalleriesDataGrid';
import useProductQuery from '../hooks/useProductQuery ';
import useGalleryCreate from '../hooks/useGalleryCreate';
import { useState } from 'react';

function ProductGalleries() {
    const [fileList, setFileList] = useState<FileList>();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { productId } = useParams();
    const productIdNumber = productId ? parseInt(productId) : 0;
    const { data } = useProductQuery(parseInt(productId as string));
    const addImageMutation = useGalleryCreate(productIdNumber);

    const product = data.data;

    const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files);
        if (!event.target.files || !event.target.files.length) return;
        setFileList(event.target.files);
    };
    const handleSubmit = () => {
        if (!fileList) return;
        const formData = new FormData();
        for (const file of fileList) {
            formData.append('images', file);
        }
        addImageMutation.mutate({ id: productIdNumber, images: formData });
        setIsSubmitted(true);
    };
    return (
        <div>
            <Typography variant='h4'>Product Name : {product.name}</Typography>
            <Input
                type='file'
                inputProps={{ multiple: true }}
                key={isSubmitted ? 'has-submitted' : 'no-submitted'}
                sx={{ mt: 1 }}
                onChange={handleChangeImage}
            />
            <Box sx={{ mt: 1 }}></Box>
            <Button variant='contained' onClick={handleSubmit}>
                Submit
            </Button>

            <GalleriesDataGrid productId={productIdNumber} />
        </div>
    );
}

export default ProductGalleries;
