import express, { Application } from "express" 
import { GlobalConfiguration } from "@/configs/GlobalConfiguration"
import { IApiRouter, IExpressServer, ILogger, IMiddleware } from "@/interfaces"
import { Logger } from "@/utils/Logger"

export class ExpressServer implements IExpressServer {
  private static _instance: ExpressServer
  private readonly afterMiddleware: Map<string, IMiddleware>
  private readonly beforeMiddleware: Map<string, IMiddleware>
  private readonly routers: Map<string, IApiRouter>
  private readonly app: Application
  private readonly globalConfiguration: GlobalConfiguration
  private readonly logger: ILogger

  private constructor() {
    this.beforeMiddleware = new Map()
    this.afterMiddleware = new Map()
    this.routers = new Map()
    this.app = express()
    this.globalConfiguration = GlobalConfiguration.getInstance()
    this.logger = new Logger('ExpressServer')
  }

  public addAfterMiddleware(middleware: IMiddleware): void {
    this.afterMiddleware.set(middleware.name, middleware)
  }

  public addBeforeMiddleware(middleware: IMiddleware): void {
    this.beforeMiddleware.set(middleware.name, middleware)
  }

  public addRouter(router: IApiRouter): void {
    this.routers.set(router.baseURI, router)
  }

  public configure(): void {
    this.app.set('trust proxy', true);
    this.app.use(express.json())
    this.beforeMiddleware.forEach((middleware: IMiddleware) => this.app.use(middleware.getExpressHandler()))
    this.routers.forEach((router: IApiRouter) => this.app.use(router.baseURI, router.getExpressRouter()))
    this.afterMiddleware.forEach((middleware: IMiddleware) => this.app.use(middleware.getExpressHandler()))
  }
  
  public listen(): void {
    const { serverPort } = this.globalConfiguration.properties
    this.app.listen(serverPort, () => this.logger.info(`Iniciado com sucesso na porta: ${serverPort}`))
  }

  public static getInstance(): ExpressServer {
    if (!this._instance) {
      this._instance = new ExpressServer()
    }

    return this._instance
  }
}