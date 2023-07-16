import { LoadProjectByNameRepository, UpdateProjectRepository } from "@/data/protocols/repositories/project-repository";
import { UpdateProject, UpdateProjectModel } from "@/domain/usecases/project/update-project";

export class DbUpdateProject implements UpdateProject {
  constructor(private readonly updateProjectRepository: UpdateProjectRepository, private readonly loadProjectByNameRepository: LoadProjectByNameRepository) {}

  async update(projectUpdateData: UpdateProjectModel): Promise<boolean> {
    const foundProject = await this.checkName(projectUpdateData.name || '');
    if (foundProject) return false;

    const updateStatus = await this.updateProjectRepository.update({ ...projectUpdateData });
    return updateStatus;
  }

  private async checkName(name: string | null) {
    if(!name) return false
    return this.loadProjectByNameRepository.loadByName(name)
  }
}