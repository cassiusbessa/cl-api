import { AddAccount } from "src/domain/usecases/users/add-account"
import { EmailInUseError } from "src/presentation/errors"
import { Controller } from "src/presentation/protocols/controller"
import { HttpRequest, HttpResponse } from "src/presentation/protocols/http"
import { badRequest, forbidden, ok, serverError } from "src/presentation/protocols/http-responses"
import { Validator } from "src/presentation/protocols/validator"

export class SignUpController implements Controller {
  constructor (private readonly addAccount: AddAccount, private readonly validator: Validator) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {

    try {

      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { fullName, email, password } = httpRequest.body

      const account = await this.addAccount.add({fullName, email, password})
      if(!account) return forbidden(new EmailInUseError())
  
      return ok({account})
      
    } catch (error) {
      return serverError(error as Error)
    }
  }
  
}