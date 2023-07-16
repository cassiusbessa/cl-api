import { AddAccount } from "src/domain/usecases/users/add-account"
import { EmailInUseError } from "../../errors"
import { Controller } from "../../protocols/controller"
import { HttpRequest, HttpResponse } from "../../protocols/http"
import { badRequest, forbidden, ok, serverError } from "../../protocols/http-responses"
import { Validator } from "../../protocols/validator"

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
      console.error(error)
      return serverError(error as Error)
    }
  }
  
}