import axiosClient from './axiois.client';

const couponApi = {
    get() {
        const url = `coupons`;
        return axiosClient.get<unknown, IApiResponse<ICoupon[]>>(url);
    },
    create(data: ICoupon) {
        const url = 'coupons';
        return axiosClient.post<unknown, IApiResponse<ICoupon>>(url, data);
    },
    delete(code: string) {
        const url = `coupons/${code}`;
        return axiosClient.delete<unknown, IApiResponse<undefined>>(url);
    }
};

export default couponApi;
