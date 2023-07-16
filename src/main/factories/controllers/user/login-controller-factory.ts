import { DbLoadAccountByEmail } from './../../../../data/usecases/users/load-account-by-email';
import { LoginController } from './../../../../presentation/controllers/user/login-controller';
import { Controller } from "../../../../presentation/protocols/controller";
import { Validator } from "../../../../presentation/protocols/validator";
import { EmailValidator } from "../../../../presentation/validators/email-validator";
import { RequiredFieldValidator } from "../../../../presentation/validators/required-fields-validator";
import { ValidatorComposite } from "../../../../presentation/validators/validator-composite";
import { makeUserRepository } from "../../repositories/user-repository-factory";
import { JwtAdapter } from "../../../../infra/cryptography/jwt-adapter";
import { DbAuthentication } from '../../../../data/usecases/users/authentication';
import { BcryptAdapter } from '../../../../infra/cryptography/bcrypt-adapter';



export const makeLoginValidator = (): Validator => { 
  const requiredFields = ['email', 'password']
  const requiredFieldValidator = new RequiredFieldValidator(requiredFields)

  const emailValidator = new EmailValidator()
  
  return new ValidatorComposite([requiredFieldValidator, emailValidator])
}

export const makeLoginController = (): Controller => {
  const userRepository = makeUserRepository()
  const tokenGenerator = new JwtAdapter()
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)

  const loadAccountByEmail = new DbLoadAccountByEmail(userRepository)
  const authentication = new DbAuthentication(bcryptAdapter, tokenGenerator)

  return new LoginController(loadAccountByEmail, authentication, makeLoginValidator())
}

