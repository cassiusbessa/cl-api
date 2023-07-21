export interface AddUserToProject {
  add: (userId: string, projectId: string) => Promise<boolean>;
}