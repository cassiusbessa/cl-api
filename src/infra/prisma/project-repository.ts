import { CreateProjectRepository, LoadProjectByIdRepository, LoadProjectByNameRepository, UpdateProjectRepository } from "@/data/protocols/repositories/project-repository";
import { Project } from "@/domain/entities/project";
import { ProjectModel } from "@/domain/usecases/project/create-project";
import { UpdateProjectModel } from "@/domain/usecases/project/update-project";
import { PrismaClient } from "@prisma/client";

export class ProjectRepository implements CreateProjectRepository, LoadProjectByIdRepository, LoadProjectByNameRepository, UpdateProjectRepository {
  private readonly prisma = new PrismaClient();

  async create(projectModel: ProjectModel): Promise<Project> {
    return await this.prisma.project.create({data: projectModel});
  }

  async loadByName(name: string): Promise<Project | null> {
    return await this.prisma.project.findUnique({where: {name}});
  }

  async loadById(id: string): Promise<Project | null> {
    return await this.prisma.project.findUnique({where: {id}, include: {Version: true, userProjects: true}});
  }

  async update(projectModel: UpdateProjectModel): Promise<boolean> {
    const { id, ...data } = projectModel;
    await this.prisma.project.update({where: {id}, data});
    return true
  }


}