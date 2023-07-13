import { User } from "src/domain/entities/user";
import { AddAccountModel } from "src/domain/usecases/users/add-account";

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<User>
}

export interface LoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<User | null>
}
