import { UpdateAccountController } from "../../../../presentation/controllers/user/update-account-controller";
import { makeUserRepository } from "../../repositories/user-repository-factory";
import { DbUpdateAccount } from "../../../../data/usecases/users/update-account";
import { BcryptAdapter } from "../../../../infra/cryptography/bcrypt-adapter";
import { DbLoadAccountById } from "../../../../data/usecases/users/load-account-by-id";
import { RequiredFieldValidator } from "../../../../presentation/validators/required-fields-validator";
import { ValidatorComposite } from "../../../../presentation/validators/validator-composite";
import { RoleValidator } from "../../../../presentation/validators/role-validator";
import { Validator } from "../../../../presentation/protocols/validator";

export const makeSignUpValidator = (): Validator => { 
  const requiredFields = ['id']
  const requiredFieldValidator = new RequiredFieldValidator(requiredFields)
  const roleValidator = new RoleValidator()
  
  return new ValidatorComposite([requiredFieldValidator, roleValidator])
}

export const makeUpdateAccountController = () => {
    const userRepository = makeUserRepository()
    
    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const updateAccount = new DbUpdateAccount(bcryptAdapter, userRepository, userRepository);

    const loadAccountById = new DbLoadAccountById(userRepository)

    return new UpdateAccountController(updateAccount, loadAccountById, makeSignUpValidator())
}