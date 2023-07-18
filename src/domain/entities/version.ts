export interface Version {
  id: string
  name: string
  description: string
  projectId: string
  active: boolean
  createdAt: Date
  updatedAt: Date
  releaseAt?: Date | null
}
