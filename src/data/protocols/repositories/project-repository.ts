import { ProjectModel } from '@/domain/usecases/project/create-project';
import { Project } from "@/domain/entities/project";

export interface LoadProjectByNameRepository {
  loadByName: (name: string) => Promise<Project | null>
}

export interface CreateProjectRepository {
  create: (projectModel: ProjectModel) => Promise<Project>
}