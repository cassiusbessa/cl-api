import { Router } from "express";
import { expressAdapterController } from "../adapters/express-route-adapter";
import { makeSignUpController } from "../factories/controllers/user/signup-controller-factory";
import { makeUpdateAccountController } from "../factories/controllers/user/update-account-controller-factory";
import { makeLoginController } from "../factories/controllers/user/login-controller-factory";
import { expressAdapterMiddleware } from "../adapters/express-middleware-adapter";
import { makeAuthMiddleware } from "../factories/middleware/auth-middleware";
import { makeCreateProjectController } from "../factories/controllers/project/create-project-factory";
import { makeUpdateProjectController } from "../factories/controllers/project/update-project-factory";
import { makeLoadAllAccountsController } from "../factories/controllers/user/load-all-accounts-controller-factory";
import { makeLoadAccountDetailsByIdController } from "../factories/controllers/user/load-account-details-by-id-factory";
import { makeLoadProjectDetailsByIdController } from "../factories/controllers/project/load-project-details-by-id-factory";
import { makeAddUserToProjectController } from "../factories/controllers/project/add-user-to-project-factory";

export const endpoints: Router = Router();

endpoints.route("/signup")
    .post(expressAdapterController(makeSignUpController()));

endpoints.route("/login")
    .post(expressAdapterController(makeLoginController()));

endpoints.route("/users")
    .get(expressAdapterMiddleware(makeAuthMiddleware(['ADMIN'])), expressAdapterController(makeLoadAllAccountsController()));

endpoints.route("/users/:id")
    .get(expressAdapterMiddleware(makeAuthMiddleware(['ADMIN', 'DEV'])), expressAdapterController(makeLoadAccountDetailsByIdController()))
    .patch(expressAdapterMiddleware(makeAuthMiddleware(['ADMIN'])), expressAdapterController(makeUpdateAccountController()));

endpoints.route("/projects")
    .post(expressAdapterMiddleware(makeAuthMiddleware(['ADMIN'])), expressAdapterController(makeCreateProjectController()))
    .put(expressAdapterMiddleware(makeAuthMiddleware(['ADMIN'])), expressAdapterController(makeAddUserToProjectController()));

endpoints.route("/projects/:id")
    .patch(expressAdapterMiddleware(makeAuthMiddleware(['ADMIN'])), expressAdapterController(makeUpdateProjectController()))
    .get(expressAdapterMiddleware(makeAuthMiddleware(['ADMIN', 'DEV', 'GUEST'])), expressAdapterController(makeLoadProjectDetailsByIdController()));
    
// endpoints.route("/:id")
//     .get(Handler)
//     .delete(Handler)
//     .put(Handler)
//     .patch(Handler);
