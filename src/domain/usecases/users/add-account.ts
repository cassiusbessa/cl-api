import { User } from "src/domain/entities/user";

export interface AddAccount {
    add: (account: AddAccountModel) => Promise<User | null>;
}

export interface AddAccountModel {
    fullName: string;
    email: string;
    password: string;
}