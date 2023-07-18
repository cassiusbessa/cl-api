import { Change } from "@/domain/entities/change";
import { Project } from "@/domain/entities/project";
import { Version } from "@/domain/entities/version";

export interface LoadProjectDetailsById {
  loadById: (projectId: string) => Promise<ProjectDetails | null>
}

export interface ProjectDetails {
  project: Project
  versions: VersionDetails[]
}

export interface VersionDetails {
  version: Version
  changes: Change[]
}