import { ProjectModel } from '@/domain/usecases/project/create-project';
import { Project } from "@/domain/entities/project";
import { UpdateProjectModel } from '@/domain/usecases/project/update-project';
import { ProjectDetails } from '@/domain/usecases/project/load-project-details-by-id';

export interface LoadProjectByNameRepository {
  loadByName: (name: string) => Promise<Project | null>
}

export interface CreateProjectRepository {
  create: (projectModel: ProjectModel) => Promise<Project>
}

export interface LoadProjectByIdRepository {
  loadById: (id: string) => Promise<Project | null>
}

export interface UpdateProjectRepository {
  update: (projectModel: UpdateProjectModel) => Promise<boolean>
}

export interface LoadProjectDetailsByIdRepository {
  loadDetailsById: (projectId: string) => Promise<ProjectDetails | null>
}

export interface AddUserToProjectRepository {
  addUser: (userId: string, projectId: string) => Promise<boolean>
}