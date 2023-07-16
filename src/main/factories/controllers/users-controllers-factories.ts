import { SignUpController } from "../../../presentation/controllers/user/signup-controller";
import { Controller } from "../../../presentation/protocols/controller";
import { Validator } from "../../../presentation/protocols/validator";
import { EmailValidator } from "../../../presentation/validators/email-validator";
import { RequiredFieldValidator } from "../../../presentation/validators/required-fields-validator";
import { ValidatorComposite } from "../../../presentation/validators/validator-composite";
import { makeUserRepository } from "../repositories/user-repository-factory";
import { DbAddAccount } from "../../../data/usecases/users/add-account";
import { BcryptAdapter } from "../../../infra/cryptography/bcrypt-adapter";



export const makeSignUpValidator = (): Validator => { 
  const requiredFields = ['fullName', 'email', 'password']
  const requiredFieldValidator = new RequiredFieldValidator(requiredFields)

  const emailValidator = new EmailValidator()

  return new ValidatorComposite([requiredFieldValidator, emailValidator])
}

export const makeSignUpController = (): Controller => {
  const userRepository = makeUserRepository()
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)

  const addAccount = new DbAddAccount(bcryptAdapter, userRepository, userRepository)
  return new SignUpController(addAccount, makeSignUpValidator())
}