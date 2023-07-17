import { User } from "src/domain/entities/user";

export interface LoadAccountByEmail {
  load: (id: string) => Promise<User | null>;
}
