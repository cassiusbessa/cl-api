import { User } from "src/domain/entities/user";
import { AccountModel } from "src/domain/usecases/users/add-account";

export interface AddAccountRepository {
  add: (accountData: AccountModel) => Promise<User>
}

export interface LoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<User | null>
}
