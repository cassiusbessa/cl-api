import { Request, Response } from 'express'
import { Controller } from 'src/presentation/protocols/controller'
import { HttpRequest } from 'src/presentation/protocols/http'
export const expressAdapterController = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
    }
    const httpResponse = await controller.handle(httpRequest)
      return res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
