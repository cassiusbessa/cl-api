import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { TokenGenerator, TokenPayload, TokenValidator } from 'src/domain/usecases/users/authentication'

export class JwtAdapter implements TokenGenerator, TokenValidator  {
  constructor (private readonly secret: string = process.env.JWT_SECRET || 'secret') {}

  generate (id: string): string {
    const accessToken = jwt.sign({ id }, this.secret)
    return accessToken
  }

  async tokenRead (token: string): Promise<TokenPayload> {
    const tokenPayload = jwt.verify(token, this.secret) as TokenPayload
    return tokenPayload
  }
}