export interface User {
  id: string
  fullName: string
  email: string
  password: string
  role: Role | null
}

export enum Role {
  ADMIN = 'ADMIN',
  DEV = 'DEV',
  GUEST = 'GUEST'
}