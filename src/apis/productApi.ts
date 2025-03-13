import { PAGE_SIZE, PARAM_TYPE, PARAMS } from '@/contants/product';
import axiosClient from './axiois.client';

const productApi = {
    getAll: () => {
        const url = 'products';
        return axiosClient.get<unknown, IApiResponse<IProduct[]>>(url);
    },
    getAllPagination: (
        page: number = 1,
        criteria: PARAM_TYPE = 'from',
        value: number = 0,
        name: string = ''
    ) => {
        const url = '/products';
        return axiosClient.get<unknown, IApiResponse<IProduct[]>>(url, {
            params: {
                page,
                pageSize: PAGE_SIZE,
                filterBy: 'price',
                filterValue: `${PARAMS[criteria]}${value}`,
                name
            }
        });
    },
    get: (id: number) => {
        const url = `/products/${id}`;
        return axiosClient.get<unknown, IApiResponse<IProduct>>(url);
    },

    create(formData: FormData) {
        const url = 'products';
        return axiosClient.post(url, formData);
    },
    addImages(id: number, formData: FormData) {
        const url = `product-images/${id}`;
        return axiosClient.post<unknown, IApiResponse<undefined>>(
            url,
            formData
        );
    },
    deleteImage(productId: number, imageId: number) {
        const url = `product-images/${productId}/${imageId}`;
        return axiosClient.delete<unknown, IApiResponse<undefined>>(url);
    },
    update(id: number, formData: FormData) {
        const url = `products/${id}`;
        return axiosClient.put<unknown, IApiResponse<IProduct>>(url, formData);
    },
    delete(id: number) {
        const url = `products/${id}`;
        return axiosClient.delete<unknown, IApiResponse<undefined>>(url);
    },
    
};

export default productApi;
