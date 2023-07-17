import { User } from "@/domain/entities/user";

export interface LoadAllAccounts {
  load: () => Promise<User[]>;
}