import { RequestHandler } from "express";
import CustomError from "./errors/custom.error";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Handler: RequestHandler = (_req, _res) => {
  throw new CustomError("This is not Implemented yet!", 404);
}