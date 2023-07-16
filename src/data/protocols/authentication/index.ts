export interface TokenGenerator {
  generate: (id: string) => string
}
export interface TokenPayload {
  id: string
  fullName: string
  email: string
  role: string | null
}

export interface TokenValidator {
  tokenRead: (token: string) => Promise<TokenPayload>
}

export interface Hasher {
  hash: (value: string) => Promise<string>
}

export interface HashComparer {
  compare: (value: string, hash: string) => Promise<boolean>
}
