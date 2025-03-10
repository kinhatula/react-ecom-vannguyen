import cartApi from '@/apis/cartApi';
import { useAppDispatch } from '@/redux/hook';
import { toast } from '@/redux/toast/toast.action';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useAddToCart() {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: cartApi.addToCart,
        onSuccess: (data) => {
            dispatch(toast.success('Add to cart successfully!'), data);
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
        onError: (error) => {
            dispatch(toast.error(error.message));
            console.log('add to cart error', error);
        }
    });
}

export default useAddToCart;
