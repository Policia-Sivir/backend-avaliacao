import { ErrorCodes } from "@/enums";

export class ApiError extends Error {
  constructor(readonly statusCode: number, readonly errorCode: ErrorCodes, message?: string, options?: ErrorOptions) {
    super(message, options)
  }
}