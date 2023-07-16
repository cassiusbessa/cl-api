import { User } from "src/domain/entities/user";

export interface LoadAccountByToken {
    load: (id: string) => Promise<User | null>;
}
