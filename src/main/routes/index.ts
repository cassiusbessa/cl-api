import { Router } from "express";
import { expressAdapterController } from "../adapters/express-route-adapter";
import { makeSignUpController } from "../factories/controllers/user/signup-controller-factory";
import { makeUpdateAccountController } from "../factories/controllers/user/update-account-controller-factory";

export const endpoints: Router = Router();

endpoints.route("/signup")
    .post(expressAdapterController(makeSignUpController()));

endpoints.route("/users/:id")
    .patch(expressAdapterController(makeUpdateAccountController()));
    
// endpoints.route("/:id")
//     .get(Handler)
//     .delete(Handler)
//     .put(Handler)
//     .patch(Handler);
