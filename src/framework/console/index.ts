import * as winston from 'winston';
import { transports, format } from "winston";
 

let rootLogger: winston.Logger;

export interface ILogger {
    register(): void;
    info(message: string): void;
}

class Logger implements ILogger {
    constructor() {}

    createRootLogger(): winston.Logger {
        const defaultMeta = {};
    
        return winston.createLogger({
            transports: [new transports.Console()],
            format: winston.format.json(),
            defaultMeta: {
                service: "WinstonExample",
              },
          })
    }    
    
    register(): void {
        if (!rootLogger) {
            rootLogger = this.createRootLogger();
        }}

    info(message: string): void {
        if (!rootLogger) {
            rootLogger = this.createRootLogger();
        }

        rootLogger.info(message);
    }
    }

export { Logger };
