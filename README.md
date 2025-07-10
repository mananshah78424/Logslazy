# JSON Logger

A structured JSON logger for Node.js with automatic environment detection for local console and Datadog production logging.

## Features

- 🚀 **Environment-aware**: Automatically adapts to local development vs production
- 📊 **Structured JSON logs**: Clean, parseable JSON output
- 🔍 **Datadog ready**: Production logs work seamlessly with Datadog
- ⚡ **High performance**: Built on Bunyan for optimal performance
- 🎯 **TypeScript support**: Full TypeScript definitions included
- 📝 **Multiple log levels**: trace, debug, info, warn, error, fatal

## Installation

```bash
npm install logslazy
```

## Quick Start

```javascript
const { Logger } = require('logslazy');

// Auto-detects environment
const logger = Logger.createLogger({ name: 'my-app' });

logger.info('User logged in', { userId: 123, ip: '192.168.1.1' });
logger.error('Database connection failed', { database: 'users', retryCount: 3 });
```

## Environment Configuration

### Local Development
```bash
NODE_ENV=development
# (no DATADOG_ENABLED or DD_ENV)
```

### Production (Datadog)
```bash
NODE_ENV=development
DATADOG_ENABLED=true
# or
DD_ENV=production
```

## API

### Logger.createLogger(options)
Creates a logger that auto-detects the environment.

```javascript
const logger = Logger.createLogger({
  name: 'my-app',
  level: 'info',
  release: 'v1.0.0'
});
```

### Logger.createLocalLogger(options)
Creates a logger configured for local development (DEBUG level).

### Logger.createProductionLogger(options)
Creates a logger configured for production (INFO level).

### Log Methods

```javascript
logger.trace('Trace message', { data: 'value' });
logger.debug('Debug message', { userId: 123 });
logger.info('Info message', { requestId: 'abc-123' });
logger.warn('Warning message', { deprecated: true });
logger.error('Error message', { statusCode: 500 });
logger.fatal('Fatal message', { critical: true });

// Special error logging
logger.logError(error, 'Custom error message');
```

## Log Output Structure

```json
{
  "name": "my-app",
  "level": 30,
  "timestamp": "2025-07-10T18:56:08.330Z",
  "nanoseconds": "1752173768329705792",
  "release": "v1.0.0",
  "message": "User logged in",
  "data": {
    "userId": 123,
    "ip": "192.168.1.1"
  }
}
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `name` | string | 'logger' | Logger name |
| `level` | string | 'info' | Log level (trace, debug, info, warn, error, fatal) |
| `release` | string | process.env.RELEASE \|\| 'none' | Release version |
| `streams` | Bunyan.Stream[] | undefined | Custom output streams |

## License

MIT 