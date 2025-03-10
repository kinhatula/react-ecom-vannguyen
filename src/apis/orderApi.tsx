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
};

export default orderApi;
