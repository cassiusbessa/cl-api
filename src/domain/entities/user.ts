export interface User {
  id: string
  fullName: string
  email: string
  password: string
  role: Role | null
}

export type Role = 'ADMIN' | 'DEV' | 'GUEST'
