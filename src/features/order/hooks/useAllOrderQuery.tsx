import orderApi from '@/apis/orderApi';
import { useQuery } from '@tanstack/react-query';

function useAllOrdersQuery() {
    const initialState: IApiResponse<IOrder[]> = {
        message: '',
        data: [
            {
                id: 0,
                userId: 0,
                address: '',
                couponCode: '',
                totalPrice: 0,
                totalQuantity: 0,
                status: '',
                orderItems: [
                    {
                        id: 0,
                        productId: 0,
                        orderId: 0,
                        variant: '',
                        price: 0,
                        quantity: 0,
                        product: {} as IProduct
                    }
                ] as IOrderItem[]
            }
        ]
    };
    const {
        data = initialState,
        isLoading,
        error
    } = useQuery({
        queryKey: ['all-orders'],
        queryFn: orderApi.getAll
    });
    return { data, isLoading, error };
}

export default useAllOrdersQuery;
