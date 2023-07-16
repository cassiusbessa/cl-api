import { CreateProjectRepository, LoadProjectByNameRepository } from "@/data/protocols/repositories/project-repository";
import { Project } from "@/domain/entities/project";
import { ProjectModel } from "@/domain/usecases/project/create-project";
import { PrismaClient } from "@prisma/client";

export class ProjectRepository implements CreateProjectRepository, LoadProjectByNameRepository {
  private readonly prisma = new PrismaClient();

  async create(projectModel: ProjectModel): Promise<Project> {
    return await this.prisma.project.create({data: projectModel});
  }

  async loadByName(name: string): Promise<Project | null> {
    return await this.prisma.project.findUnique({where: {name}});
  }


}