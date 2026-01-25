import { ILogger } from "@/interfaces"
import { Log } from '@/types'

export class Logger implements ILogger {
  private readonly MATCHER: string
  private log?: Partial<Log>

  constructor(readonly source: string) {
    this.MATCHER = '$'
  }

  public info(log: string): void {
    console.info(this.build('info', log).stringify())
  }
  
  public warn(log: string): void {
    console.warn(this.build('warn', log).stringify())
  }

  public error(log: string, error: Error): void {
    console.error(this.build('error', log, error).stringify())
  }

  private stringify(): string {
    return JSON.stringify(this.log)
  }

  private build(level: string, message: string, error?: Error): Logger {
    this.log = { timestamp: new Date().toISOString(), message, level, source: this.source, error: error?.message }
    return this
  }
}