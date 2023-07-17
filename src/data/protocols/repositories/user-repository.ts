import { UpdateAccountModel } from "@/domain/usecases/users/update-account";
import { User } from "src/domain/entities/user";
import { AccountModel } from "src/domain/usecases/users/add-account";

export interface AddAccountRepository {
  add: (accountData: AccountModel) => Promise<User>
}

export interface LoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<User | null>
}

export interface LoadAccountByIdRepository {
  loadById: (id: string) => Promise<User | null>
}

export interface UpdateAccountRepository {
  update: (updateAccountData: UpdateAccountModel) => Promise<boolean>
}

export interface LoadAllAccountsRepository {
  loadAll: () => Promise<User[]>
}
