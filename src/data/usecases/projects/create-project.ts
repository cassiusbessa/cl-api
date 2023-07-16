import { CreateProjectRepository, LoadProjectByNameRepository } from "@/data/protocols/repositories/project-repository"
import { Project } from "@/domain/entities/project"
import { CreateProject, ProjectModel } from "@/domain/usecases/project/create-project"

export class DbCreateProject implements CreateProject {
  constructor (private readonly createProjectRepository: CreateProjectRepository, private readonly loadProjectByNameRepository: LoadProjectByNameRepository) {}

  async create(projectModel: ProjectModel): Promise<Project | null> {
    const project = await this.loadProjectByNameRepository.loadByName(projectModel.name)
    if(project) return null
    return await this.createProjectRepository.create(projectModel)
  }
}