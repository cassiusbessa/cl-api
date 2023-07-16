import { LoadProjectByIdRepository } from "@/data/protocols/repositories/project-repository";
import { LoadProjectById } from "@/domain/usecases/project/load-project-by-id";

export class DbLoadProjectById implements LoadProjectById {
   constructor(private readonly loadProjectByIdRepository: LoadProjectByIdRepository) {}
   
    async load(id: string) {
        const project = await this.loadProjectByIdRepository.loadById(id);
        if (!project) return null;        
        return project;
    }
}