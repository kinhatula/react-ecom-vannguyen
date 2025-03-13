import axiosClient from './axiois.client';

const addressApi = {
    create(data: IAddressPayload) {
        const url = 'addresses';
        return axiosClient.post<unknown, IApiResponse<IAddress>>(url, data);
    },
    getAll() {
        const url = 'addresses/me';
        return axiosClient.get<unknown, IApiResponse<IAddress[]>>(url);
    },
    delete(id: number) {
        const url = `addresses/${id}`;
        return axiosClient.delete<unknown, IApiResponse<undefined>>(url);
    }
};

export default addressApi;
