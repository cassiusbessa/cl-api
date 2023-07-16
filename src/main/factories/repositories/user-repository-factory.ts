import { UserRepository } from "../../../infra/prisma/user-repository"

export const makeUserRepository = () => {
    return new UserRepository()
}