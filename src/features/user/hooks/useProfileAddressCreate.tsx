import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseFormReset } from 'react-hook-form';
import { IInPutFields } from '../components/ProfileAddress';
import addressApi from '@/apis/addressApi';

function useProfileAddressCreate(
    userId: number,
    reset: UseFormReset<IInPutFields>
) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addressApi.create,
        onSuccess: (data) => {
            console.log('create address success', data);
            queryClient.invalidateQueries({ queryKey: ['addresses', userId] });
            reset();
        },
        onError: (error) => {
            console.log('create address error', error);
        }
    });
}

export default useProfileAddressCreate;
