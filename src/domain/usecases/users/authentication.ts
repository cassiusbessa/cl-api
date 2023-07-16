import { User } from "@/domain/entities/user"

export interface Authentication {
  auth: (login: Credentials, user: User) => Promise<string | null>
}

export interface Credentials {
  email: string
  password: string
}


