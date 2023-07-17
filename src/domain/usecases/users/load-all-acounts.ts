import { User } from "@/domain/entities/user";

export interface LoadAllAccounts {
  load: () => Promise<Omit<User, 'password'>[]>;
}