/// <reference types="vite/client" />

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
