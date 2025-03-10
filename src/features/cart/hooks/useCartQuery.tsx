import cartApi from '@/apis/cartApi';
import { useQuery } from '@tanstack/react-query';

function useCartQuery() {
    const initialState = {
        message: '',
        data: { id: 0, userId: 0, totalPrice: 0, cartItems: [] as ICartItem[] }
    } as IApiResponse<ICart>;

    const {
        data = initialState,
        isLoading,
        error
    } = useQuery({
        queryKey: ['cart'],
        queryFn: () => cartApi.getAll()
    });
    return { data, isLoading, error };
}

export default useCartQuery;
