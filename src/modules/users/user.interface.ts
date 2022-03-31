import {Document} from 'mongoose';

export interface IUser {
    _id?: any | string;
    fullName: string;
    email: string;
    password: string;
    roles: string;
    isActive: boolean;

    createdAt?: string;
    updatedAt?: string;
}

export interface IUserModel extends Document, IUser {}

export interface ICreateUser {
    fullName: string;
    email: string;
    password: string;
}
