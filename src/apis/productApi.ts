import axiosClient from './axiois.client';

const productApi = {
    getAll: () => {
        const url = '/products';
        return axiosClient.get<unknown, IApiResponse<IProduct[]>>(url);
    },
    create: () => {
        const url = '/products';
        return axiosClient.post(url);
    }
};

export default productApi;
