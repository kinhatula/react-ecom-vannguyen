import axiosClient from './axiois.client';

const reviewApi = {
    get(productId: number) {
        const url = `reviews/avg/${productId}`;
        return axiosClient.get<unknown, IApiResponse<number>>(url);
    },
    add(data: IReviewPayload) {
        const url = 'reviews';
        return axiosClient.post<unknown, IApiResponse<undefined>>(url, data);
    }
};

export default reviewApi;
