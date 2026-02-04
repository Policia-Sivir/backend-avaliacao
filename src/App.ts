import 'dotenv/config'
import { ExpressServer } from "@/servers/ExpressServer"
import { IExpressServer } from '@/interfaces'
import { MongoConfiguration } from '@/configs/MongoConfiguration'
import { ErrorHandlerMiddleware } from '@/middlewares/ErrorHandlerMiddleware'
import { ReviewRouter } from '@/routers/ReviewRouter'


class App {
  readonly server: IExpressServer
  readonly mongoDb: MongoConfiguration

  constructor() {
    this.server = ExpressServer.getInstance()
    this.mongoDb = MongoConfiguration.getInstance()
  }

  public async start() {
    // 1 - Conecta no banco
    await this.mongoDb.connect()
    
    // 2 - Registra o router de avaliações
    this.server.addRouter(new ReviewRouter())

    // 3 - Middleware global de erro
    const errorHandlerMiddleware = new ErrorHandlerMiddleware()
    this.server.addAfterMiddleware(errorHandlerMiddleware)

    // 4 - Configura e sobe o servidor
    this.server.configure()
    this.server.listen()
  }
}

new App().start()