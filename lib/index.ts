import Bunyan from "bunyan";

export class Logger {
    private logger: Bunyan;

    constructor(name = "app", level: Bunyan.LogLevel = Bunyan.INFO) {
        this.logger = Bunyan.createLogger({
            name,
            level,
            streams: [{ stream: process.stdout }], // Always log to stdout
        });
    }

    trace(message: string, data: Record<string, any> = {}) {
        this.logger.trace({ data }, message);
    }

    debug(message: string, data: Record<string, any> = {}) {
        this.logger.debug({ data }, message);
    }

    info(message: string, data: Record<string, any> = {}) {
        this.logger.info({ data }, message);
    }

    warn(message: string, data: Record<string, any> = {}) {
        this.logger.warn({ data }, message);
    }

    error(message: string, data: Record<string, any> = {}) {
        this.logger.error({ data }, message);
    }

    fatal(message: string, data: Record<string, any> = {}) {
        this.logger.fatal({ data }, message);
    }
}

export default Logger;
