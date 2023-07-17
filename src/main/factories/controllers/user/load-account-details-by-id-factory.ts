import { LoadAccountDetailsByIdController } from "../../../../presentation/controllers/user/load-account-details-by-id-controller"
import { RequiredFieldValidator } from "../../../../presentation/validators/required-fields-validator"
import { ValidatorComposite } from "../../../../presentation/validators/validator-composite"
import { makeUserRepository } from "../../repositories"
import { DbLoadAccountDetailsById } from "../../../../data/usecases/users/load-account-details-by-id"

const makeLoadAccountDetailsByIdValidator = () => {
  const requiredFields = ['id']
  const requiredFieldValidator = new RequiredFieldValidator(requiredFields)

  return new ValidatorComposite([requiredFieldValidator])
}

export const makeLoadAccountDetailsByIdController = () => {
  const userRepository = makeUserRepository()
  const validator = makeLoadAccountDetailsByIdValidator()
  const loadAccountDetailsById = new DbLoadAccountDetailsById(userRepository)

  return new LoadAccountDetailsByIdController(loadAccountDetailsById, validator)
}