import { LoadAccountById } from '../../domain/usecases/users/load-account-by-id';
import { NotFoundError } from "../errors"
import { AccessDeniedError } from "../errors/access-denied-error"
import { HttpRequest, HttpResponse } from "../protocols/http"
import { ok, serverError, unauthorized } from "../protocols/http-responses"
import { Middleware } from "../protocols/middleware"

export class AdminMiddleware implements Middleware {
  constructor (private readonly loadAccountToken: LoadAccountById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {

    console.log(httpRequest.headers)

    try {
      const token = httpRequest.headers?.['x-access-token']
      if (!token) return unauthorized(new NotFoundError('token'))

      const account = await this.loadAccountToken.load(token)
      if (!account) return unauthorized(new AccessDeniedError())

      const { role } = account
      if (role !== 'ADMIN') return unauthorized(new AccessDeniedError())

      return ok({user: account})

    } catch (error) {
      console.error(error)
      return serverError(error as Error)
    }
  }
  
}