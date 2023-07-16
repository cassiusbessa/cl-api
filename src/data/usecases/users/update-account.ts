import { UpdateAccount, UpdateAccountModel } from "@/domain/usecases/users/update-account"
import { formatFullName } from "../../../utils"
import { UpdateAccountRepository, LoadAccountByEmailRepository } from "src/data/protocols/repositories/user-repository"
import { Hasher } from "src/domain/usecases/users/authentication"

export class DbUpdateAccount implements UpdateAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly updateAccountRepository: UpdateAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  public async update (accountUpdateData: UpdateAccountModel): Promise<boolean> {
    
    const foundAccount = await this.checkEmail(accountUpdateData.email)
    if (foundAccount) return false
    
    await this.editUpdateData(accountUpdateData)
    const updateStatus = await this.updateAccountRepository.update({ ...accountUpdateData })
    return updateStatus
  }

  private async editUpdateData(accountUpdateData: UpdateAccountModel): Promise<void> {
    if (accountUpdateData.password) {
      accountUpdateData.password = await this.hasher.hash(accountUpdateData.password)
    }
    if (accountUpdateData.fullName) {
      accountUpdateData.fullName = formatFullName(accountUpdateData.fullName)
    }
  }

  private async checkEmail(email: string | null) {
    if(!email) return false
    return this.loadAccountByEmailRepository.loadByEmail(email)
  }
}
