import { useMutation, useQueryClient } from '@tanstack/react-query';
import couponApi from '@/apis/couponApi';

function useCouponDelete(handleCloseConfirmModal: () => void) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: couponApi.delete,
        onSuccess: (data) => {
            console.log('delete success', data);
            handleCloseConfirmModal();
            queryClient.invalidateQueries({ queryKey: ['coupons'] });
        },
        onError: (error) => {
            console.log('delete error', error);
        }
    });
}
export default useCouponDelete;
