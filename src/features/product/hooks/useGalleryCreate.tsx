import productApi from '@/apis/productApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface IDataPayload {
    id: number;
    images: FormData;
}
function useGalleryCreate(productId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: IDataPayload) =>
            productApi.addImages(data.id, data.images),
        onSuccess: (data) => {
            console.log('create gallery success', data);
            queryClient.invalidateQueries({
                queryKey: ['products', productId]
            });
        },
        onError: (error) => {
            console.log('create gallery error', error);
        }
    });
}

export default useGalleryCreate;
