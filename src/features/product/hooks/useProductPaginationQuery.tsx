import productApi from '@/apis/productApi';
import { useQuery } from '@tanstack/react-query';

function useProductPaginationQuery(page: number) {
    const initialState: IApiResponse<IProduct[]> = {
        message: '',
        totalCount: 0,
        data: []
    };
    const {
        data = initialState,
        isLoading,
        error
    } = useQuery({
        queryKey: ['products', page],
        queryFn: () => productApi.getAllPagination(page)
    });
    return { data, isLoading, error };
}

export default useProductPaginationQuery;
