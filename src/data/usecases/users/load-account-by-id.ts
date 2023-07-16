import { LoadAccountByIdRepository } from "@/data/protocols/repositories/user-repository"
import { LoadAccountById } from "@/domain/usecases/users/load-account-by-id"
import { User } from "src/domain/entities/user"


export class DbLoadAccountById implements LoadAccountById {
  constructor (
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository
  ) {}

  public async load (id: string): Promise<User | null> {
    const user = await this.loadAccountByIdRepository.loadById(id)
    return user
  }
}
