import { User } from './../../domain/entities/user';
import { AddUserToProjectRepository, CreateProjectRepository, LoadProjectByIdRepository, LoadProjectByNameRepository, LoadProjectDetailsByIdRepository, UpdateProjectRepository } from "@/data/protocols/repositories/project-repository";
import { Project } from "@/domain/entities/project";
import { ProjectModel } from "@/domain/usecases/project/create-project";
import { ProjectDetails } from "@/domain/usecases/project/load-project-details-by-id";
import { UpdateProjectModel } from "@/domain/usecases/project/update-project";
import { PrismaClient } from "@prisma/client";

export class ProjectRepository implements CreateProjectRepository, LoadProjectByIdRepository, LoadProjectByNameRepository, UpdateProjectRepository, LoadProjectDetailsByIdRepository, AddUserToProjectRepository {
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

  async loadDetailsById(projectId: string): Promise<ProjectDetails | null> {
    const project = await this.prisma.project.findUnique({where: {id: projectId}, include: {Version: true, userProjects: {include: {user: true}}}});
    if (!project) return null;

    const versions = await this.prisma.version.findMany({where: {projectId}, include: {Change: true}});
    if (!versions) {
      return {project, versions: []};
    }

    const versionsWithChanges = versions.map(version => {
      const changes = version.Change;
      return {version, changes};
    });

    return {project, versions: versionsWithChanges};
  }

  async addUser(userId: string, projectId: string): Promise<boolean> {
    await this.prisma.userProject.create({data: {userId, projectId}});
    return true;
  }
}