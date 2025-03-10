import orderApi from '@/apis/orderApi';
import { useAppDispatch } from '@/redux/hook';
import { toast } from '@/redux/toast/toast.action';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useCheckout(handleClose: () => void) {
    const queryClient = useQueryClient();
    const dispatch = useAppDispatch();
    return useMutation({
        mutationFn: orderApi.create,
        onSuccess: (data) => {
            dispatch(toast.success('Checkout successfully!'));
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            handleClose();
        },
        onError: (error) => {
            console.log('checkout error', error);
            dispatch(toast.error(error.message));
        }
    });
}

export default useCheckout;
