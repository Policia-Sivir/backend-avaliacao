export enum ErrorCodes {
  ERROR_0000 = 'ERROR_0000',// 500 - Generic internal server error
  ERROR_0001 = 'ERROR_0001',// 404 - Resource not found
  ERROR_0002 = 'ERROR_0002',// 400 - Invalid request parameters / User bad request
  ERROR_0003 = 'ERROR_0003',// 401|403 -Unauthorized access
  ERROR_0004 = 'ERROR_0004',// 409 - Conflict error / User bad request / estado invalido
  ERROR_0005 = 'ERROR_0005',// 400 Validation error / User bad request
}