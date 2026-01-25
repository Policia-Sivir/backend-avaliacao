import { IConfiguration } from "@/interfaces"
import { ErrorConfigurationProperties } from "@/types"

export class ErrorConfiguration implements IConfiguration<ErrorConfigurationProperties> {
  private static _instance?: ErrorConfiguration
  readonly properties: ErrorConfigurationProperties

  private constructor() {
    this.properties = {
      ERROR_0000: process.env.ERROR_0000 ?? 'Internal server error.',
      ERROR_0001: process.env.ERROR_0001 ?? 'Resource not found.',
      ERROR_0002: process.env.ERROR_0002 ?? 'User bad request.',
      ERROR_0003: process.env.ERROR_0003 ?? 'Unauthorized Access.',
      ERROR_0004: process.env.ERROR_0004 ?? 'User bad request.',
      ERROR_0005: process.env.ERROR_0005 ?? 'User bad request.',
    }
  }

  public static getInstance(): ErrorConfiguration {
    if (!this._instance) {
      this._instance = new ErrorConfiguration()
    }

    return this._instance
  }
}