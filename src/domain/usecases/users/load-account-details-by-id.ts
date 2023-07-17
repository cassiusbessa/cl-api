import { Project } from "@/domain/entities/project";
import { User } from "@/domain/entities/user";

export interface LoadAccountDetailsById {
  load: (id: string) => Promise<AccountDetails | null>;
}

export interface AccountDetails {
  user: Omit<User, 'password'>;
  projects: Project[];
}