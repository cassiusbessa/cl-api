import { AddUserToProjectRepository } from "@/data/protocols/repositories/project-repository";
import { AddUserToProject } from "@/domain/usecases/project/add-user-to-project";

export class DbAddUserToProject implements AddUserToProject {
  constructor(private readonly addUserToProjectRepository: AddUserToProjectRepository) {}

  async add(userId: string, projectId: string): Promise<boolean> {
    return await this.addUserToProjectRepository.addUser(userId, projectId)
  }
}