import { LoadProjectByNameRepository } from "@/data/protocols/repositories/project-repository"
import { Project } from "@/domain/entities/project"
import { LoadProjectByName } from "@/domain/usecases/project/load-project-by-name"



export class DbLoadProjectByName implements LoadProjectByName {
  constructor (
    private readonly loadProjectByNameRepository: LoadProjectByNameRepository
  ) {}

  public async load(name: string): Promise<Project | null> {
    const project = await this.loadProjectByNameRepository.loadByName(name)
    return project
  }
}
