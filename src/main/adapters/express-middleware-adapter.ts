import { Middleware } from '@/presentation/protocols/middleware'
import { NextFunction, Request, Response } from 'express'
import { HttpRequest } from 'src/presentation/protocols/http'
export const expressAdapterMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      headers: req.headers,
    }
    const httpResponse = await middleware.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body)
      next()
      return
    }
    return res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
