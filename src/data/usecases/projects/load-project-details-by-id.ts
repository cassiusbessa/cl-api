import { LoadProjectDetailsByIdRepository } from "@/data/protocols/repositories/project-repository";
import { ProjectDetails } from "@/domain/usecases/project/load-project-details-by-id";

export class DbLoadProjectDetailsById {
    constructor(private readonly loadProjectDetailsByIdRepository: LoadProjectDetailsByIdRepository){}
    async loadById(projectId: string): Promise<ProjectDetails | null>  {
        return this.loadProjectDetailsByIdRepository.loadDetailsById(projectId);
    }
}