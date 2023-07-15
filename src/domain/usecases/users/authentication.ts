export interface GenerateToken {
  generate: (accountModel: TokenPayload) => string
}

export interface TokenPayload {
  id: string
  fullName: string
  email: string
  role: string | null
}

export interface Hasher {
  hash: (value: string) => Promise<string>
}
