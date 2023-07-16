import { User } from "src/domain/entities/user";

export interface LoadAccountById {
    load: (id: string) => Promise<User | null>;
}
