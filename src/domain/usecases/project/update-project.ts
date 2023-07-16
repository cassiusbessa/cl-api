export interface UpdateProject {
  update: (project: UpdateProjectModel) => Promise<boolean>
}

export interface UpdateProjectModel {
  id: string
  name?: string
  description?: string
  startDate?: Date
  endDate?: Date
  public?: boolean
}