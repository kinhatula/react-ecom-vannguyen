import axiosClient from './axiois.client';

const userApi = {
    update(id: number, data: IUserPayload) {
        const url = `users/${id}`; //users;
        return axiosClient.put<unknown, IApiResponse<IUserResponse>>(url, data);
    },
    changePassword(data: IUserPasswordPayload) {
        const url = 'users/change-password';
        return axiosClient.post<unknown, IApiResponse<undefined>>(url, data);
    },
    changeAddress(data: IUserPasswordPayload) {
        const url = 'users/change-address';
        return axiosClient.post<unknown, IApiResponse<undefined>>(url, data);
    }
};

export default userApi;
