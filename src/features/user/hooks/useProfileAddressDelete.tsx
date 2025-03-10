import addressApi from '@/apis/addressApi';
import { toast } from '@/redux/toast/toast.action';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

function useProfileAddressDelete(userId: number) {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    return useMutation({
        mutationFn: addressApi.delete,
        onSuccess: (data) => {
            console.log('delete address success', data);
            queryClient.invalidateQueries({ queryKey: ['addresses', userId] });
            dispatch(toast.success('Delete address successfully!'));
        },
        onError: (error) => {
            console.log('delete address error', error);
            dispatch(toast.error(error.message));
        }
    });
}

export default useProfileAddressDelete;
