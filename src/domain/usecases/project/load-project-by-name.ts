import { Project } from "@/domain/entities/project";

export interface LoadProjectByName {
    load: (id: string) => Promise<Project | null>;
}
