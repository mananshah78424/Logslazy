import Bunyan from "bunyan";
import Nano from "nano-time"
export interface LoggerOptions {
    level?: Bunyan.LogLevel; 
    name?: string;
    release?: string;
    streams?: Bunyan.Stream[];
}

export interface CustomLoggerOptions extends Partial<LoggerOptions> {
    data?: Record<string, any>;
}

export class Logger {

    private logger: Bunyan;
    private release: string;

    static readonly TRACE = 'trace';
    static readonly DEBUG = 'debug';
    static readonly INFO = 'info';
    static readonly WARN = 'warn';
    static readonly ERROR = 'error';
    static readonly FATAL = 'fatal';
    

    /**
     * Creates a JSON Logger for Node.js
     * @param name - The name of the logger
     */
    constructor(options: LoggerOptions ={}) {
        const {
            level = Bunyan.INFO,
            name = 'logger',
            release = process.env.RELEASE || 'none',
            streams = undefined,
        } = options;

        this.release = release;

        // Determine streams based on environment
        let loggerStreams: Bunyan.Stream[];
        
        if (streams) {
            // Use custom streams if provided
            loggerStreams = streams;
        } else if (process.env.DATADOG_ENABLED === 'true' || process.env.DD_ENV === 'production') {
            // In production with Datadog enabled
            loggerStreams = [{ stream: process.stdout }];
        } else {
            // Local development - console output
            loggerStreams = [{ stream: process.stdout }];
        }

        const loggerConfig: Bunyan.LoggerOptions = {
            name,
            level,
            streams: loggerStreams
        }

        this.logger = Bunyan.createLogger(loggerConfig);
    }

    private buildLogData(data: Record<string, any>){
        const { message, ...additionalData } = data;
        return {
            timestamp: new Date().toISOString(),
            nanoseconds: Nano(),
            release: this.release,
            message,
            data: Object.keys(additionalData).length > 0 ? additionalData : undefined
        }
    }

    /**
     * Writes a trace JSON log to the console
     */
    trace(message: string, data: Record<string, any> = {}){
        this.logger.trace(this.buildLogData({message, ...data}));
    }

    /**
     * Writes a debug JSON log to the console
     */ 
    debug(message: string, data: Record<string, any> = {}){
        this.logger.debug(this.buildLogData({message, ...data}));
    }

    /**
     * Writes an info JSON log to the console
     */ 
    info(message: string, data: Record<string, any> = {}){
        this.logger.info(this.buildLogData({message, ...data}));
    }

    /**
     * Writes a warn JSON log to the console
     */ 
    warn(message: string, data: Record<string, any> = {}){
        this.logger.warn(this.buildLogData({message, ...data}));
    }

    /**
     * Writes an error JSON log to the console
     */ 
    error(message: string, data: Record<string, any> = {}){
        this.logger.error(this.buildLogData({message, ...data}));
    }

    /**
     * Writes a fatal JSON log to the console
     */ 
    fatal(message: string, data: Record<string, any> = {}){
        this.logger.fatal(this.buildLogData({message, ...data}));
    }
    

    /**
     * Log an error with error details
     */
    logError(error: Error, message?: string){
        const errorData = {
            error: {
                message: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined,
                name: error instanceof Error ? error.name : undefined,
            },
        }

        this.error(message ||'Unhandled error', errorData);
    }

    /**
     * Create a logger configured for local development
     */
    static createLocalLogger(options: LoggerOptions = {}): Logger {
        return new Logger({
            ...options,
            level: options.level || Bunyan.DEBUG, // More verbose in local
        });
    }

    /**
     * Create a logger configured for production (Datadog)
     */
    static createProductionLogger(options: LoggerOptions = {}): Logger {
        return new Logger({
            ...options,
            level: options.level || Bunyan.INFO, // Less verbose in production
        });
    }

    /**
     * Create a logger based on current environment
     */
    static createLogger(options: LoggerOptions = {}): Logger {
        const isProduction = process.env.DATADOG_ENABLED === 'true' || process.env.DD_ENV === 'production';
        return isProduction 
            ? Logger.createProductionLogger(options)
            : Logger.createLocalLogger(options);
    }
    

    
}

// Default export for ES modules
export default Logger;