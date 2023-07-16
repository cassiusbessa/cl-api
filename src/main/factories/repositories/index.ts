import { ProjectRepository } from "../../../infra/prisma/project-repository"
import { UserRepository } from "../../../infra/prisma/user-repository"

export const makeUserRepository = () => {
    return new UserRepository()
}

export const makeProjectRepository = () => {
    return new ProjectRepository()
}