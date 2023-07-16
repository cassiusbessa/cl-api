import { HashComparer, TokenGenerator } from "@/data/protocols/authentication"
import { User } from "@/domain/entities/user"
import { Authentication, Credentials } from "src/domain/usecases/users/authentication"

export class DbAuthentication implements Authentication {
  constructor (
    private readonly hasherComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  public async auth(login: Credentials, user: User): Promise<string | null> {
    const isValid = await this.hasherComparer.compare(login.password, user.password)

    if (!isValid) return null

    const token = this.tokenGenerator.generate(user.id)
    return token
  }
}
