import productApi from '@/apis/productApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface IDataPayload {
    id: number;
    product: FormData;
}
function useProductUpdate(handleClose: () => void) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: IDataPayload) =>
            productApi.update(data.id, data.product),
        onSuccess: (data) => {
            console.log('update product success', data);
            handleClose();
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
        onError: (error) => {
            console.log('update product error', error);
        }
    });
}

export default useProductUpdate;
