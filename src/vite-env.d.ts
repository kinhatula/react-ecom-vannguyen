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
    id: number;
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

//cart

interface IAddToCartPayload {
    productId: number;
    quantity: number;
}
interface ICartItem {
    id: number;
    productId: number;
    cartId: number;
    price: number;
    quantity: number;
    productName: string;
    productImage: string;
}
interface ICart {
    id: number;
    userId: number;
    totalPrice: number;
    cartItems: ICartItem[];
}
//user

interface IUserPayload {
    firstName: string;
    lastName: string;
}
interface IUserResponse {
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
}
interface IUserPasswordPayload {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}
//address
interface IAddressPayload {
    street: string;
    province: string;
    country: string;
    postalCode: number;
}

interface IAddress {
    id: number;
    street: string;
    province: string;
    country: string;
    postalCode: number;
    userId: number;
}
//order
interface IOrderPayload {
    couponCode: string;
    addressId: number;
}
interface IOrDerStatusPayload {
    status: string;
}
interface IOrderItem {
    id: number;
    productId: number;
    orderId: number;
    variant: string;
    price: number;
    quantity: number;
    product: IProduct;
}
interface IOrder {
    id: number;
    userId: number;
    address: string;
    couponCode: string;
    totalPrice: number;
    totalQuantity: number;
    status: string;
    orderItems: IOrderItem[];
}
//review
interface IReviewPayload {
    productId: number;
    rating: number;
    comment: string;
}

//coupon
type ICouponType = 'PERCENT' | 'VALUE';
interface ICoupon {
    code: string;
    discountPrice: number;
    discountType: string;
}
