import { Role } from '@/domain/entities/user'
import { Validator } from '../protocols/validator'
import { InvalidParamError } from '../errors';

export class RoleValidator implements Validator {
  constructor (private readonly fields: string[]) {}

  validate (input: any): Error | null {
    if (!input.role) return null

    const valid = Object.values(Role).includes(input.role);
    if (!valid) return new InvalidParamError('role')
    return null

  }
}
