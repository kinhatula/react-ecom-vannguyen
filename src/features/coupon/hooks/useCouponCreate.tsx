import couponApi from '@/apis/couponApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseFormReset } from 'react-hook-form';
import { IInPutFields } from '../components/CouponModal';

function useCouponCreate(
    handleClose: () => void,
    reset: UseFormReset<IInPutFields>
) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: couponApi.create,
        onSuccess: (data) => {
            handleClose();
            queryClient.invalidateQueries({
                queryKey: ['coupons']
            });
            reset();
        },
        onError: (error) => {
            console.log(error.message);
        }
    });
}

export default useCouponCreate;
