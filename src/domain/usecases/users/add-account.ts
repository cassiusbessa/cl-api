import { User } from "src/domain/entities/user";

export interface AddAccount {
    add: (account: AccountModel) => Promise<User | null>;
}

export interface AccountModel {
    fullName: string;
    email: string;
    password: string;
}