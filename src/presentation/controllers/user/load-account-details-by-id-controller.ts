import { LoadAccountDetailsById } from "@/domain/usecases/users/load-account-details-by-id"
import { Controller } from "../../protocols/controller"
import { HttpRequest, HttpResponse } from "../../protocols/http"
import { badRequest, ok, serverError } from "../../protocols/http-responses"
import { Validator } from "@/presentation/protocols/validator"

export class LoadAccountDetailsByIdController implements Controller {
    constructor (private readonly loadAccountDetails: LoadAccountDetailsById, private readonly validator: Validator) {}
  
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {    
      try {
        const error = this.validator.validate(httpRequest.params) 
        if (error) return badRequest(error)
        const { id } = httpRequest.params
        const users = await this.loadAccountDetails.load(id)
        return ok(users)
      } catch (error) {
        console.error(error)
        return serverError(error as Error)
      }
    }
}