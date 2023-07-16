import { ValidatorComposite } from "../../../../presentation/validators/validator-composite";
import { RequiredFieldValidator } from "../../../../presentation/validators/required-fields-validator";
import { Validator } from "../../../../presentation/protocols/validator";
import { makeProjectRepository } from "../../repositories";
import { Controller } from "../../../../presentation/protocols/controller";
import { DbCreateProject } from "../../../../data/usecases/projects/create-project";
import { CreateProjectController } from "../../../../presentation/controllers/project/create-project-controller";

const makeCreateProjectValidator = (): Validator => {
    const requiredFields = ['name', 'description'];
    const requiredFieldValidator = new RequiredFieldValidator(requiredFields);
    return new ValidatorComposite([requiredFieldValidator]);
}

export const makeCreateProjectController = (): Controller => {
    const projectRepository = makeProjectRepository();
    const createProject = new DbCreateProject(projectRepository, projectRepository);
    return new CreateProjectController(createProject, makeCreateProjectValidator());
}