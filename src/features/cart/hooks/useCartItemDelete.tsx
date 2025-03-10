import cartApi from '@/apis/cartApi';
import { useAppDispatch } from '@/redux/hook';
import { toast } from '@/redux/toast/toast.action';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useCartItemDelete() {
    const dispatch = useAppDispatch();

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: cartApi.deleteItem,
        onSuccess: (data) => {
            console.log('delete cart item success', data);
            dispatch(toast.success('Delete cart item successfully!'));
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
        onError: (error) => {
            console.log('delete cart item error', error);
        }
    });
}

export default useCartItemDelete;
