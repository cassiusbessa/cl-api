import { DbLoadAccountByToken } from '../../../data/usecases/users/load-account-by-token';
import { makeUserRepository } from "../repositories";
import { JwtAdapter } from "../../../infra/cryptography/jwt-adapter";
import { AuthMiddleware } from '../../../presentation/middleware/auth-middleware';
import { Middleware } from '../../../presentation/protocols/middleware';

export const makeAuthMiddleware = (allowedRoles: string[]): Middleware => {
  const userRepository = makeUserRepository()
  const tokenRead = new JwtAdapter()

  const loadAccountByToken = new DbLoadAccountByToken(userRepository, tokenRead)

  return new AuthMiddleware(loadAccountByToken, allowedRoles)
}

