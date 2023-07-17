import { LoadAllAccountsRepository } from "@/data/protocols/repositories/user-repository";
import { User } from "@/domain/entities/user";
import { LoadAllAccounts } from "@/domain/usecases/users/load-all-acounts";

export class DbLoadAllAccounts implements LoadAllAccounts {
  constructor (private readonly loadAllAccountsRepository: LoadAllAccountsRepository) {}

  async load (): Promise<User[]> {
    const users = await this.loadAllAccountsRepository.loadAll()
    return users
  }
}