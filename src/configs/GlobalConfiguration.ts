import { IConfiguration } from "@/interfaces"
import { GlobalConfigurationProperties } from '@/types'

export class GlobalConfiguration implements IConfiguration<GlobalConfigurationProperties> {
  private static _instance?: GlobalConfiguration
  readonly properties: GlobalConfigurationProperties

  private constructor() {
    this.properties = {
      serverPort: process.env.SERVER_PORT ?? ''
    }
  }

  public static getInstance(): GlobalConfiguration {
    if (!this._instance) {
      this._instance = new GlobalConfiguration()
    }

    return this._instance
  }
}