import axiosClient from './axiois.client';

const productApi = {
    getAll: () => {
        const url = '/products';
        return axiosClient.get<unknown, IApiResponse<IProduct[]>>(url);
    },
    get: (id: number) => {
        const url = `/products/${id}`;
        return axiosClient.get<unknown, IApiResponse<IProduct>>(url);
    },

    create(formData: FormData) {
        const url = 'products';
        return axiosClient.post(url, formData);
    },
    update(id: number, formData: FormData) {
        const url = `products/${id}`;
        return axiosClient.put<unknown, IApiResponse<IProduct>>(url, formData);
    },
    delete(id: number) {
        const url = `products/${id}`;
        return axiosClient.delete<unknown, IApiResponse<undefined>>(url);
    }
};

export default productApi;
