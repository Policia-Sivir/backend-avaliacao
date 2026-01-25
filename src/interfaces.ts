import { ErrorRequestHandler, RequestHandler, Router } from "express"

export interface IMiddleware {
  name: string
  getExpressHandler: () => RequestHandler | ErrorRequestHandler
}

export interface IApiRouter {
  baseURI: string
  getExpressRouter: () => Router
}

export interface IExpressServer {
  addRouter(router: IApiRouter): void
  addAfterMiddleware(middleware: IMiddleware): void
  addBeforeMiddleware(middleware: IMiddleware): void
  configure(): void
  listen(): void
}

export interface IConfiguration<T> {
  readonly properties: T
}

export interface ILogger {
  info(log: string): void
  warn(log: string): void
  error(log: string, error: Error): void
}

export interface IBuilder<T> {
  build(): T
}