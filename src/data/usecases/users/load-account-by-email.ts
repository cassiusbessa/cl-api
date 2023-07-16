import { LoadAccountByEmailRepository } from "@/data/protocols/repositories/user-repository"
import { LoadAccountByEmail } from "@/domain/usecases/users/load-account-by-email"
import { User } from "src/domain/entities/user"


export class DbLoadAccountByEmail implements LoadAccountByEmail{
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  public async load(email: string): Promise<User | null> {
    const user = await this.loadAccountByEmailRepository.loadByEmail(email)
    return user
  }
}
