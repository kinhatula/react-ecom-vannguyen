import reviewApi from '@/apis/reviewApi';
import { toast } from '@/redux/toast/toast.action';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

function useProductReviewCreate(productId: number, resetState: () => void) {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: reviewApi.add,
        onSuccess: (data) => {
            console.log('review product success', data);
            queryClient.invalidateQueries({
                queryKey: ['product_review', productId]
            });
            dispatch(toast.success('Review product successfully!'));
            resetState();
        },
        onError: (error) => {
            dispatch(toast.error(error.message));
        }
    });
}

export default useProductReviewCreate;
