import orderApi from '@/apis/orderApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
interface IDataPayload {
    id: number;
    data: IOrDerStatusPayload;
}

function useOrderStatusUpdate() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: IDataPayload) =>
            orderApi.updateStatus(id, data),
        onSuccess: () => {
            console.log('update order success');
            queryClient.invalidateQueries({ queryKey: ['all-orders'] });
        },
        onError: (error) => {
            console.log('update order error', error);
        }
    });
}

export default useOrderStatusUpdate;
