import { Router } from "express";
import { expressAdapterController } from "../adapters/express-route-adapter";
import { makeSignUpController } from "../factories/controllers/user/signup-controller-factory";
import { makeUpdateAccountController } from "../factories/controllers/user/update-account-controller-factory";
import { makeLoginController } from "../factories/controllers/user/login-controller-factory";
import { expressAdapterMiddleware } from "../adapters/express-middleware-adapter";
import { makeAuthMiddleware } from "../factories/middleware/auth-middleware";

export const endpoints: Router = Router();

endpoints.route("/signup")
    .post(expressAdapterController(makeSignUpController()));

endpoints.route("/login")
    .post(expressAdapterController(makeLoginController()));

endpoints.route("/users/:id")
    .patch(expressAdapterMiddleware(makeAuthMiddleware(['ADMIN'])), expressAdapterController(makeUpdateAccountController()));
    
// endpoints.route("/:id")
//     .get(Handler)
//     .delete(Handler)
//     .put(Handler)
//     .patch(Handler);
