import productApi from '@/apis/productApi';
import { toast } from '@/redux/toast/toast.action';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
interface IDataPayload {
    productId: number;
    imageId: number;
}

function useGalleryDelete(productId: number) {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: ({ productId, imageId }: IDataPayload) =>
            productApi.deleteImage(productId, imageId),
        onSuccess: (data) => {
            dispatch(toast.success('Delete image successfully!'));
            queryClient.invalidateQueries({
                queryKey: ['products', productId]
            });
        },
        onError: (error) => {
            console.log('delete image error', error);
        }
    });
}

export default useGalleryDelete;
