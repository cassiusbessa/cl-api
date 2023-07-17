import { Project } from "src/domain/entities/project";

export interface CreateProject {
  create: (project: ProjectModel) => Promise<Project | null>;
}

export interface ProjectModel {
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  public: boolean;
}