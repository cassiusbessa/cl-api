import { RequiredFieldValidator } from "../../../../presentation/validators/required-fields-validator";
import { Validator } from "../../../../presentation/protocols/validator"
import { ValidatorComposite } from "../../../../presentation/validators/validator-composite";
import { Controller } from "../../../../presentation/protocols/controller";
import { makeProjectRepository, makeUserRepository } from "../../repositories";
import { DbAddUserToProject } from "../../../../data/usecases/projects/add-user-to-project";
import { AddUserToProjectController } from "../../../../presentation/controllers/project/add-user-to-project-controller";
import { DbLoadAccountById } from "../../../../data/usecases/users/load-account-by-id";
import { DbLoadProjectById } from "../../../../data/usecases/projects/load-project-by-id";

const makeAddUserToProjectValidator = (): Validator => {
  const requiredFields = ['userId', 'projectId'];
  const requiredFieldValidator = new RequiredFieldValidator(requiredFields);

  return new ValidatorComposite([requiredFieldValidator]);
}

export const makeAddUserToProjectController = (): Controller => {
  const projectRepository = makeProjectRepository();
  const userRepository = makeUserRepository();

  const loadAccountById = new DbLoadAccountById(userRepository);
  const loadProjectById = new DbLoadProjectById(projectRepository);

  const addUserToProject = new DbAddUserToProject(projectRepository);
  return new AddUserToProjectController(addUserToProject, loadAccountById, loadProjectById, makeAddUserToProjectValidator());
}