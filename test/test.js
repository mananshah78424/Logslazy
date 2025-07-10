const { Logger } = require('./dist/index.js');

// Test the logger
const logger = new Logger({ name: 'test-logger', level: 'debug' });

console.log('Testing logger functionality...\n');

// Test all log levels
logger.trace('This is a trace message', { userId: 123, action: 'login' });
logger.debug('This is a debug message', { requestId: 'abc-123', method: 'GET' });
logger.info('This is an info message', { userAgent: 'Mozilla/5.0', ip: '192.168.1.1' });
logger.warn('This is a warning message', { deprecated: true, feature: 'old-api' });
logger.error('This is an error message', { statusCode: 500, endpoint: '/api/users' });
logger.fatal('This is a fatal message', { critical: true, system: 'database' });

// Test error logging
try {
    throw new Error('Test error for logging');
} catch (error) {
    logger.logError(error, 'Caught test error');
}

console.log('\nLogger test completed!'); 