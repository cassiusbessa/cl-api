import { LoadProjectById } from "@/domain/usecases/project/load-project-by-id"
import { NotFoundError, ParamInUseError } from "../../errors"
import { Controller } from "../../protocols/controller"
import { HttpRequest, HttpResponse } from "../../protocols/http"
import { badRequest, forbidden, notFound, ok, serverError } from "../../protocols/http-responses"
import { Validator } from "../../protocols/validator"
import { UpdateProject } from "@/domain/usecases/project/update-project"

export class UpdateProjectController implements Controller {
    constructor (private readonly updateProject: UpdateProject, private readonly loadProjectById: LoadProjectById, private readonly validator: Validator) {}
  
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
  
      try {
  
        const error = this.validator.validate({ ...httpRequest.body, id: httpRequest.params.id })
        if (error) {
          return badRequest(error)
        }

        const project = await this.loadProjectById.load(httpRequest.params.id)
        console.log(project)
        if (!project) return notFound(new NotFoundError('Project'))
  
        const updatedStatus = await this.updateProject.update({...httpRequest.body, id: httpRequest.params.id})
        if (!updatedStatus) return forbidden(new ParamInUseError('name'))        
        return ok({message: updatedStatus})
        
      } catch (error) {
        console.error(error)
        return serverError(error as Error)
      }
    }
}