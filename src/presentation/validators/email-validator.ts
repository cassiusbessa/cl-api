import { InvalidParamError } from "../errors"
import { Validator } from "../protocols/validator"

export class EmailValidator implements Validator {

  validate (input: any): Error | null {
    const { email } = input

    if (typeof email !== 'string') return new InvalidParamError('email')

    const regex = new RegExp(/^.+@.+(\.com|\.br)$/gi)
    const isValid = regex.test(email)

    if (!isValid) return new InvalidParamError('email')
    
    return null
  }
}