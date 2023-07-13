import { Hasher } from "src/data/protocols/cryptography"
import { AddAccountRepository, LoadAccountByEmailRepository } from "src/data/protocols/repositories/user-repository"
import { User } from "src/domain/entities/user"
import { AddAccount, AddAccountModel } from "src/domain/usecases/users/add-account"

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<User | null> {
    const foundAccount = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (foundAccount) return null
    
    const hashedPassword = await this.hasher.hash(accountData.password)
    const user = await this.addAccountRepository.add({ ...accountData, password: hashedPassword })
    return user
  }
}
