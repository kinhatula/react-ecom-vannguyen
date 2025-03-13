import couponApi from '@/apis/couponApi';
import { useQuery } from '@tanstack/react-query';

function useCouponsQuery() {
    const initialState: IApiResponse<ICoupon[]> = {
        message: '',
        data: [
            {
                code: '',
                discountPrice: 0,
                discountType: 'string'
            }
        ]
    };
    const {
        data = initialState,
        isLoading,
        error
    } = useQuery({
        queryKey: ['coupons'],
        queryFn: couponApi.get
    });
    return { data, isLoading, error };
}

export default useCouponsQuery;
