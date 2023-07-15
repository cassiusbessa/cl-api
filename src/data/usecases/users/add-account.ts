import { AddAccountRepository, LoadAccountByEmailRepository } from "src/data/protocols/repositories/user-repository"
import { User } from "src/domain/entities/user"
import { AddAccount, AccountModel } from "src/domain/usecases/users/add-account"
import { Hasher } from "src/domain/usecases/users/authentication"

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  public async add (accountData: AccountModel): Promise<User | null> {
    const foundAccount = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (foundAccount) return null
    
    const hashedPassword = await this.hasher.hash(accountData.password)

    accountData.fullName = this.formateFullName(accountData.fullName)
    const user = await this.addAccountRepository.add({ ...accountData, password: hashedPassword })
    return user
  }

  private formateFullName (fullName: string): string {
    return fullName.trim().split(' ').map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ')
  }
}
