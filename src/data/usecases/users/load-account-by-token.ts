import { TokenRead } from "@/data/protocols/authentication"
import { LoadAccountByIdRepository } from "@/data/protocols/repositories/user-repository"
import { LoadAccountByToken } from "@/domain/usecases/users/load-account-by-token"
import { User } from "src/domain/entities/user"


export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly tokenRead: TokenRead
  ) {}

  public async load (token: string): Promise<User | null> {
    const { id } = await this.tokenRead.read(token)
    const user = await this.loadAccountByIdRepository.loadById(id)
    return user
  }
}
