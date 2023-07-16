import { DbLoadAccountByToken } from '../../../data/usecases/users/load-account-by-token';
import { makeUserRepository } from "../repositories/user-repository-factory";
import { JwtAdapter } from "../../../infra/cryptography/jwt-adapter";
import { AdminMiddleware } from '../../../presentation/middleware/admin-middleware';
import { Middleware } from '../../../presentation/protocols/middleware';

export const makeAdminMiddleware = (): Middleware => {
  const userRepository = makeUserRepository()
  const tokenRead = new JwtAdapter()

  const loadAccountByToken = new DbLoadAccountByToken(userRepository, tokenRead)

  return new AdminMiddleware(loadAccountByToken)
}

