import productApi from '@/apis/productApi';
import { PARAM_TYPE } from '@/contants/product';
import { useQuery } from '@tanstack/react-query';

function useProductPaginationQuery(
    page: number,
    currentCriteria: PARAM_TYPE,
    currentFilterValue: number,
    search: string
) {
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
        queryKey: [
            'products',
            page,
            currentCriteria,
            currentFilterValue,
            search
        ],
        queryFn: () =>
            productApi.getAllPagination(
                page,
                currentCriteria,
                currentFilterValue,
                search
            )
    });
    return { data, isLoading, error };
}

export default useProductPaginationQuery;
