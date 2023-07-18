import { HttpRequest, HttpResponse } from "@/presentation/protocols/http"
import { badRequest, ok, serverError } from "../../protocols/http-responses"
import { LoadProjectDetailsById } from "@/domain/usecases/project/load-project-details-by-id"
import { Validator } from "@/presentation/protocols/validator"

export class LoadProjectDetailsByIdController {
  constructor (private readonly loadProjectDetailsById: LoadProjectDetailsById, private readonly validator: Validator) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.params)
      if (error) return badRequest(error)
      const { id } = httpRequest.params
      const project = await this.loadProjectDetailsById.loadById(id)
      return ok(project)
    } catch (error) {
      console.error(error)
      return serverError(error as Error)
    }
  }
}