/// <reference types="vite/client" />
import { IError } from '../../backend-ecommerce/src/globals/middlewares/error.middleware';

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
