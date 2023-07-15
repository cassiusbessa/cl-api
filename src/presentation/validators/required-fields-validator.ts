import { MissingParamError } from '../../presentation/errors'
import { Validator } from '../protocols/validator'

export class RequiredFieldValidator implements Validator {
  constructor (private readonly fields: string[]) {}

  validate (input: any): Error | null {
    for (const field of this.fields) {
      if (!input[field]) {
        return new MissingParamError(field)
      }
    }
    return null
  }
}
