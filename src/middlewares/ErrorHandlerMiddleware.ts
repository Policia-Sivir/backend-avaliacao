import { ErrorConfiguration } from "@/configs/ErrorConfiguration";
import { ErrorCodes } from "@/enums";
import { IConfiguration, ILogger, IMiddleware } from "@/interfaces";
import { ErrorConfigurationProperties } from "@/types";
import { ApiError } from "@/utils/ApiError";
import { Logger } from "@/utils/Logger";
import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

export class ErrorHandlerMiddleware implements IMiddleware {
  readonly name: string
  private readonly logger: ILogger
  private readonly errorConfiguration: IConfiguration<ErrorConfigurationProperties>

  constructor() {
    this.name = 'ErrorHandlerMiddleware'
    this.errorConfiguration = ErrorConfiguration.getInstance()
    this.logger = new Logger('ErrorHandlerMiddleware')
  }

  public getExpressHandler(): ErrorRequestHandler {
    return (error: Error, _req: Request, res: Response, _next: NextFunction) => {
      let apiError: ApiError 
      if (!(error instanceof ApiError)) {
        this.logger.error(error.message, error)
        apiError = new ApiError(500, ErrorCodes.ERROR_0000, this.errorConfiguration.properties[ErrorCodes.ERROR_0000])
      } else {
        this.logger.warn(this.errorConfiguration.properties[error.errorCode])
        apiError = error
      }

      res.status(apiError.statusCode).json({
        code: apiError.errorCode,
        message: this.errorConfiguration.properties[apiError.errorCode]
      })
    }
  }

}