import { Router } from "express";
import { Handler } from "../../presentation";

export const endpoints: Router = Router();

endpoints.route("/")
    .get(Handler)
    .get(Handler)
    .post(Handler);
    
endpoints.route("/:id")
    .get(Handler)
    .delete(Handler)
    .put(Handler)
    .patch(Handler);
