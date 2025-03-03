import productApi from '@/apis/productApi';
import { useQuery } from '@tanstack/react-query';

function useProductQuery(id: number) {
    const initialState: IApiResponse<IProduct> = {
        message: '',
        data: {
            id: 1,
            name: '',
            shortDescription: '',
            longDescription: '',
            price: 1,
            quantity: 1,
            main_image: '',
            categoryId: 1,
            shopId: 1,
            productImages: []
        }
    };
    const {
        data = initialState,
        isLoading,
        error
    } = useQuery({
        queryKey: ['products', id],
        queryFn: () => productApi.get(id)
    });
    return { data, isLoading, error };
}

export default useProductQuery;
