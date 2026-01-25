export type GlobalConfigurationProperties = {
  serverPort: string
}

export type Log = {
  timestamp: string,
  message: string,
  level: string,
  source: string,
  trace_id?: string,
  span_id?: string,
  error?: string,
}

export type MongoConfigurationProperties = {
  mongoURL: string
}

export type ErrorConfigurationProperties = {
  ERROR_0000: string,
  ERROR_0001: string,
  ERROR_0002: string,
  ERROR_0003: string,
  ERROR_0004: string,
  ERROR_0005: string,
}