import { ServerError } from "../errors/server-error"
import { HttpResponse } from "./http"

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: {error: error.message}
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
})

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: {error: error.message}
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: {error: error.message}
})