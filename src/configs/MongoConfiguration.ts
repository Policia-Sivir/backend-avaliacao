import { IConfiguration, ILogger } from "@/interfaces"
import { MongoConfigurationProperties } from "@/types"
import { Logger } from "@/utils/Logger"
import mongoose from "mongoose"

export class MongoConfiguration implements IConfiguration<MongoConfigurationProperties> {
  readonly properties: MongoConfigurationProperties
  readonly logger: ILogger
  private static instance?: MongoConfiguration

  public static getInstance(): MongoConfiguration {
    if (!this.instance) {
      this.instance = new MongoConfiguration()
    }

    return this.instance
  }

  private constructor() {
    this.properties = {
      mongoURL: process.env.MONGO_URL ?? ''
    }
    this.logger = new Logger('MongoConfiguration')
  }

  public async connect() {
    await mongoose.connect(this.properties.mongoURL).then(() => {
      this.logger.info(`Conexão com o MongoDB estabelecida com sucesso.`)
    }).catch((error: any) => {
      this.logger.error(`Ocorreu erros com a conexão com MongoDB.`, error)
    })
  }
}