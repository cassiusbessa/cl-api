import { Validator } from '../protocols/validator'
import { InvalidParamError } from '../errors';

export class RoleValidator implements Validator {

  validate (input: any): Error | null {
    if (!input.role) return null

    const roles = ['ADMIN', 'DEV', 'GUEST']
    const valid = roles.includes(input.role)
    if (!valid) return new InvalidParamError('role')
    return null

  }
}
