import addressApi from '@/apis/addressApi';
import { useQuery } from '@tanstack/react-query';

function useProfileAddressQuery(userId: number) {
    const initialState: IApiResponse<IAddress[]> = {
        message: '',
        data: [
            {
                id: 0,
                street: '',
                province: '',
                country: '',
                postalCode: 0,
                userId: 0
            }
        ]
    };
    const {
        data = initialState,
        isLoading,
        error
    } = useQuery({
        queryKey: ['addresses', userId],
        queryFn: addressApi.getAll
    });
    return { data, isLoading, error };
}

export default useProfileAddressQuery;
