export interface TokenGenerator {
  generate: (accountModel: TokenPayload) => string
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
