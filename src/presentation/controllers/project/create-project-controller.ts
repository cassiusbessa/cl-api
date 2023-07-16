import { ParamInUseError } from "../../errors"
import { Controller } from "../../protocols/controller"
import { HttpRequest, HttpResponse } from "../../protocols/http"
import { badRequest, forbidden, ok, serverError } from "../../protocols/http-responses"
import { Validator } from "../../protocols/validator"
import { CreateProject } from "@/domain/usecases/project/create-project"

export class CreateProjectController implements Controller {
  constructor (private readonly createProject: CreateProject, private readonly validator: Validator) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {

    try {

      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const project = await this.createProject.create(httpRequest.body)
      if (!project) return forbidden(new ParamInUseError('name'))        
      return ok({project})
      
    } catch (error) {
      console.error(error)
      return serverError(error as Error)
    }
  }
  
}