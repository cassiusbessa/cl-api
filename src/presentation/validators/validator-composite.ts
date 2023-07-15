import { HelperValidator, Validator } from "../protocols/validator"

export class ValidatorComposite implements Validator {
  constructor (private readonly validators: Validator[]) {}

  validate (input: any, helper?: HelperValidator ): Error | null {
    for (const validator of this.validators) {
      const error = validator.validate(input, helper)
      if (error) {
        return error
      }
    }
    return null
  }
}