import axiosClient from './axiois.client';

const orderApi = {
    create(data: IOrderPayload) {
        const url = 'orders'; //users;
        return axiosClient.post<unknown, IApiResponse<undefined>>(url, data);
    },
    getMyOrders() {
        const url = 'orders';
        return axiosClient.get<unknown, IApiResponse<IOrder[]>>(url);
    },
    getAll() {
        const url = 'orders/all';
        return axiosClient.get<unknown, IApiResponse<IOrder[]>>(url);
    },
    updateStatus(id: number, data: IOrDerStatusPayload) {
        const url = `orders/${id}`;
        return axiosClient.put<unknown, IApiResponse<undefined>>(url, data);
    }
};

export default orderApi;
