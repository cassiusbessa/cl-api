export interface TokenGenerator {
  generate: (id: string) => string
}
export interface TokenPayload {
  id: string
}

export interface TokenRead {
  read: (token: string) => Promise<TokenPayload>
}

export interface Hasher {
  hash: (value: string) => Promise<string>
}

export interface HashComparer {
  compare: (value: string, hash: string) => Promise<boolean>
}
