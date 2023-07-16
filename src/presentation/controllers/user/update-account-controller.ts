import { LoadAccountById } from "@/domain/usecases/users/load-account-by-id"
import { ParamInUseError, NotFoundError } from "../../errors"
import { Controller } from "../../protocols/controller"
import { HttpRequest, HttpResponse } from "../../protocols/http"
import { badRequest, forbidden, notFound, ok, serverError } from "../../protocols/http-responses"
import { Validator } from "../../protocols/validator"
import { UpdateAccount } from "@/domain/usecases/users/update-account"

export class UpdateAccountController implements Controller {
  constructor (private readonly updateAccount: UpdateAccount, private readonly loadAccountById: LoadAccountById, private readonly validator: Validator) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const error = this.validator.validate({ ...httpRequest.body, id: httpRequest.params.id })
      if (error) return badRequest(error)   

      const account = await this.loadAccountById.load(httpRequest.params.id)
      if(!account) return notFound(new NotFoundError('User'))

      const updatedStatus = await this.updateAccount.update({...httpRequest.body, id: httpRequest.params.id})
      if(!updatedStatus) return forbidden(new ParamInUseError('email'))
  
      return ok({message: updatedStatus})
      
    } catch (error) {
      console.error(error)
      return serverError(error as Error)
    }
  }
  
}