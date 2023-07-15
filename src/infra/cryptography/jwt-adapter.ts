import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { GenerateToken, TokenPayload } from 'src/domain/usecases/users/authentication'

export class JwtAdapter implements GenerateToken {
  constructor (private readonly secret: string = process.env.JWT_SECRET || 'secret') {}

  generate (tokenPayload: TokenPayload): string {
    const accessToken = jwt.sign({ tokenPayload }, this.secret)
    return accessToken
  }
}