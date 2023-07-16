import { NotFoundError } from "../errors"
import { AccessDeniedError } from "../errors/access-denied-error"
import { HttpRequest, HttpResponse } from "../protocols/http"
import { ok, serverError, unauthorized } from "../protocols/http-responses"
import { Middleware } from "../protocols/middleware"
import { TokenValidator } from "@/domain/usecases/users/authentication"

export class AdminMiddleware implements Middleware {
  constructor ( private readonly tokenValidator: TokenValidator) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {

    try {
      const token = httpRequest.headers?.['x-access-token']
      if (!token) return unauthorized(new NotFoundError('token'))

      const tokenPayload = await this.tokenValidator.tokenRead(token)
      if (tokenPayload.role !== 'admin') return unauthorized(new AccessDeniedError())

      return ok(tokenPayload)

    } catch (error) {
      console.log(error)
      return serverError(error as Error)
    }
  }
  
}