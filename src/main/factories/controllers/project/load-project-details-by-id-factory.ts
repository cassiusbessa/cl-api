import { RequiredFieldValidator } from "../../../../presentation/validators/required-fields-validator";
import { Validator } from "../../../../presentation/protocols/validator";
import { ValidatorComposite } from "../../../../presentation/validators/validator-composite";
import { Controller } from "../../../../presentation/protocols/controller";
import { LoadProjectDetailsByIdController } from "../../../../presentation/controllers/project/load-project-details-by-id-controller";
import { makeProjectRepository } from "../../repositories";
import { DbLoadProjectDetailsById } from "../../../../data/usecases/projects/load-project-details-by-id";

export const makeLoadProjectDetailsByIdValidator = (): Validator => {
  const requiredFieldValidator = new RequiredFieldValidator(['id']);
  return new ValidatorComposite([requiredFieldValidator]);
}

export const makeLoadProjectDetailsByIdController = (): Controller => {
  const validator = makeLoadProjectDetailsByIdValidator();

  const projectRepository = makeProjectRepository();
  const loadProjectDetailsById = new DbLoadProjectDetailsById(projectRepository);
  return new LoadProjectDetailsByIdController(loadProjectDetailsById, validator);

}