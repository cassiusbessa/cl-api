import { DbUpdateProject } from "../../../../data/usecases/projects/update-project";
import { UpdateProjectController } from "../../../../presentation/controllers/project/update-project-controller";
import { makeProjectRepository } from "../../repositories";
import { Controller } from "../../../../presentation/protocols/controller";
import { DbLoadProjectById } from "../../../../data/usecases/projects/load-project-by-id";
import { Validator } from "../../../../presentation/protocols/validator";
import { RequiredFieldValidator } from "../../../../presentation/validators/required-fields-validator";
import { ValidatorComposite } from "../../../../presentation/validators/validator-composite";

export const makeUpdateProjectValidator = (): Validator => { 
  const requiredFields = ['id']
  const requiredFieldValidator = new RequiredFieldValidator(requiredFields)
  
  return new ValidatorComposite([requiredFieldValidator])
}

export const makeUpdateProjectController = (): Controller => {
    const projectRepository = makeProjectRepository();
    const updateProject = new DbUpdateProject(projectRepository, projectRepository);
    const loadProjectById = new DbLoadProjectById(projectRepository);

    return new UpdateProjectController(updateProject, loadProjectById, makeUpdateProjectValidator());
}