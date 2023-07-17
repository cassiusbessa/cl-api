import { NotFoundError } from "../../errors"
import { Controller } from "../../protocols/controller"
import { HttpRequest, HttpResponse } from "../../protocols/http"
import { badRequest, notFound, ok, serverError, unauthorized } from "../../protocols/http-responses"
import { Validator } from "../../protocols/validator"
import { LoadAccountByEmail } from "@/domain/usecases/users/load-account-by-email"
import { AccessDeniedError } from "../../errors/access-denied-error"
import { Authentication } from "@/domain/usecases/users/authentication"

export class LoginController implements Controller {
  constructor (private readonly loadAccount: LoadAccountByEmail, private readonly authentication: Authentication, private readonly validator: Validator) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {

    try {

      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      
      const { email, password } = httpRequest.body

      const account = await this.loadAccount.load(email)
      if(!account) return notFound(new NotFoundError('user'))

      if(!account.role) return unauthorized(new AccessDeniedError())

      const auth = await this.authentication.auth({email, password}, account)
      if (!auth) return unauthorized(new AccessDeniedError())
  
      return ok({accessToken: auth, account})
      
    } catch (error) {
      console.error(error)
      return serverError(error as Error)
    }
  }
  
}