import reviewApi from '@/apis/reviewApi';
import { useQuery } from '@tanstack/react-query';

function useProductReviewQuery(productId: number) {
    const initialState = {
        message: '',
        data: 4
    };
    const {
        data = initialState,
        isLoading,
        error
    } = useQuery({
        queryKey: ['product_review', productId],
        queryFn: () => reviewApi.get(productId)
    });
    return { data, isLoading, error };
}

export default useProductReviewQuery;
