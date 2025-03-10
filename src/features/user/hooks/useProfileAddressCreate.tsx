import addressApi from '@/apis/addressApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useProfileAddressCreate(userId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addressApi.create,
        onSuccess: (data) => {
            console.log('create address success', data);
            queryClient.invalidateQueries({ queryKey: ['addresses', userId] });
        },
        onError: (error) => {
            console.log('create address error', error);
        }
    });
}

export default useProfileAddressCreate;
