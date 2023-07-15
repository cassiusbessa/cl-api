import { InvalidParamError } from "../errors"
import { Validator } from "../protocols/validator"

export class EmailValidator implements Validator {

  validate (email: any): Error | null {

    if (typeof email !== 'string') return new InvalidParamError('email')

    const isValid = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (!isValid) return new InvalidParamError('email')
    
    return null
  }
}