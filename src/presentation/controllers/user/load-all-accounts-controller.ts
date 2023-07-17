import { HttpRequest, HttpResponse } from "../../protocols/http";
import { Controller } from "../../protocols/controller";
import { ok, serverError } from "../../protocols/http-responses";
import { LoadAllAccounts } from "@/domain/usecases/users/load-all-acounts";

export class LoadAllAccountController implements Controller {
  constructor (private readonly loadAllAccounts: LoadAllAccounts) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {    
    try {
      const users = await this.loadAllAccounts.load()
      return ok(users)
    } catch (error) {
      console.error(error)
      return serverError(error as Error)
    }
  }
  
}