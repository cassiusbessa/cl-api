import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { TokenGenerator, TokenRead, TokenPayload } from '@/data/protocols/authentication'

export class JwtAdapter implements TokenGenerator, TokenRead  {
  constructor (private readonly secret: string = process.env.JWT_SECRET || 'secret') {}

  generate (id: string): string {
    const accessToken = jwt.sign({ id }, this.secret)
    return accessToken
  }

  async read (token: string): Promise<TokenPayload> {
    const tokenPayload = jwt.verify(token, this.secret) as TokenPayload
    return tokenPayload
  }
}