import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Textarea from '@mui/joy/Textarea';
import { Button } from '@mui/material';
import { useState } from 'react';
import useProductReviewCreate from '../hooks/useProductReviewCreate';

interface ProductReviewProps {
    productId: number;
}

export default function ProductReview({ productId }: ProductReviewProps) {
    const [value, setValue] = useState<number | null>(4);
    const [comment, setComment] = useState('');

    const resetState = () => {
        setValue(4);
        setComment('');
    };
    const productReviewMutation = useProductReviewCreate(productId, resetState);

    const handleReview = () => {
        if (value === null) return;
        const reviewPayload = {
            productId,
            rating: value,
            comment
        };
        productReviewMutation.mutate(reviewPayload);
    };
    return (
        <Box sx={{ '& > legend': { mt: 2 } }}>
            <Typography component='legend'>Review Star</Typography>
            <Rating
                name='simple-controlled'
                value={value}
                onChange={(_event, newValue) => {
                    setValue(newValue);
                }}
            />
            <Textarea
                required
                placeholder='Your Review'
                style={{ width: '100%', height: '50px', marginBottom: '20px' }}
                onChange={(e) => setComment(e.target.value)}
                value={comment}
            />
            <Button variant='contained' color='success' onClick={handleReview}>
                Submit
            </Button>
        </Box>
    );
}

