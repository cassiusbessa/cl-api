import { Router } from "express";
import { expressAdapterController } from "../adapters/express-route-adapter";
import { makeSignUpController } from "../factories/controllers/user/signup-controller-factory";
import { makeUpdateAccountController } from "../factories/controllers/user/update-account-controller-factory";
import { makeLoginController } from "../factories/controllers/user/login-controller-factory";
import { expressAdapterMiddleware } from "../adapters/express-middleware-adapter";
import { makeAuthMiddleware } from "../factories/middleware/auth-middleware";
import { makeCreateProjectController } from "../factories/controllers/project/create-project-factory";
import { makeUpdateProjectController } from "../factories/controllers/project/update-project-factory";

export const endpoints: Router = Router();

endpoints.route("/signup")
    .post(expressAdapterController(makeSignUpController()));

endpoints.route("/login")
    .post(expressAdapterController(makeLoginController()));

endpoints.route("/users/:id")
    .patch(expressAdapterMiddleware(makeAuthMiddleware(['ADMIN'])), expressAdapterController(makeUpdateAccountController()));

endpoints.route("/projects")
    .post(expressAdapterMiddleware(makeAuthMiddleware(['ADMIN'])), expressAdapterController(makeCreateProjectController()));

endpoints.route("/projects/:id")
    .patch(expressAdapterMiddleware(makeAuthMiddleware(['ADMIN'])), expressAdapterController(makeUpdateProjectController()));
    
// endpoints.route("/:id")
//     .get(Handler)
//     .delete(Handler)
//     .put(Handler)
//     .patch(Handler);
