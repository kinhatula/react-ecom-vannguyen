import axiosClient from './axiois.client';

const cartApi = {
    addToCart(data: IAddToCartPayload) {
        const url = 'carts';
        return axiosClient.post<unknown, IApiResponse<undefined>>(url, data);
    },
    getAll() {
        const url = 'carts';
        return axiosClient.get<unknown, IApiResponse<ICart>>(url);
    },
    deleteItem(cartItemId: number) {
        const url = `carts/item/${cartItemId}`;
        return axiosClient.delete<unknown, IApiResponse<ICart>>(url);
    }
};

export default cartApi;
