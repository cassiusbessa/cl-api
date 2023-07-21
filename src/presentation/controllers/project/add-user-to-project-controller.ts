import { LoadAccountById } from './../../../domain/usecases/users/load-account-by-id';
import { AddUserToProject } from "@/domain/usecases/project/add-user-to-project";
import { Validator } from "../../../presentation/protocols/validator";
import { Controller } from "../../..//presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "../../../presentation/protocols/http";
import { badRequest, ok, serverError } from "../../../presentation/protocols/http-responses";
import { LoadProjectById } from '@/domain/usecases/project/load-project-by-id';

export class AddUserToProjectController implements Controller {
  constructor (private readonly addUserToProject: AddUserToProject, private readonly loadAccountById: LoadAccountById, private readonly loadProjectById: LoadProjectById,  private readonly validator: Validator) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) return badRequest(error)
  
      const { userId, projectId } = httpRequest.body
  
      const user = await this.loadAccountById.load(userId)
      if (!user) return badRequest(new Error('User not found'))
  
      const project = await this.loadProjectById.load(projectId)
      if (!project) return badRequest(new Error('Project not found'))
  
      await this.addUserToProject.add(userId, projectId)
      return ok({message: true})
    } catch (error) {
      console.error(error)
      return serverError(error as Error)
    }
  }

}