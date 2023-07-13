export interface Validator {
  validate: (input: any, helpers?: HelperValidator) => Error | null;
}

export interface HelperValidator {
  [key: string]: any
}