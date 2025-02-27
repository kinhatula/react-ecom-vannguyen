import categoryApi from '@/apis/categoryApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useCategoryCreate(handleClose: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: categoryApi.create,
        onSuccess: (data) => {
            console.log('create cate success', data);
            handleClose();
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
        onError: (error) => {
            console.log('error', error);
        }
    });
}

export default useCategoryCreate;
