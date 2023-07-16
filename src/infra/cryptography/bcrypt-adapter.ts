import { Hasher, HashComparer } from '@/data/protocols/authentication'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor (private readonly salt: number) {}

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }

  async compare (value: string, hash: string): Promise<boolean> {
    try {
      const isValid = await bcrypt.compare(value, hash)
      return isValid
    } catch (error) {
      return false
    }    
  }
}