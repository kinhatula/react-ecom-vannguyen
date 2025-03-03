/// <reference types="vite/client" />

interface ILoginPayload {
    email: string;
    password: string;
}
interface IAuthPayload {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    avatar: string;
}

interface IUserData {
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
    role: string;
}

interface IErrorResponse {
    message: string;
    status: string;
    statusCode: number;
}
// common Response
interface IApiResponse<T> {
    message: string;
    totalCount?: number;
    data: T;
}

//category
interface ICategory {
    id: number;
    name: string;
    icon: string;
    status: Boolean;
}

interface ICategoryPayload {
    name: string;
    icon: string;
}

//product
interface IProduct {
    id: number;
    name: string;
    shortDescription: string;
    longDescription: string;
    price: number;
    quantity: number;
    main_image: string;
    categoryId: number;
    shopId: number;
    productImages: IGallery[];
}

// Galleries
interface IGallery {
    id: number;
    image: string;
    productId: number;
}
