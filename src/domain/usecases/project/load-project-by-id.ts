import { Project } from "@/domain/entities/project";

export interface LoadProjectById {
  load: (id: string) => Promise<Project | null>;
}
