import Logger from '../dist/index.js';

// Test the logger
const logger = new Logger('test-logger', 'debug');

console.log('Testing logger functionality...\n');

// Test all log levels with data grouping
logger.trace('This is a trace message', { userId: 123, action: 'login' });
logger.debug('This is a debug message', { requestId: 'abc-123', method: 'GET' });
logger.info('This is an info message', { userAgent: 'Mozilla/5.0', ip: '192.168.1.1' });
logger.warn('This is a warning message', { deprecated: true, feature: 'old-api' });
logger.error('This is an error message', { statusCode: 500, endpoint: '/api/users' });
logger.fatal('This is a fatal message', { critical: true, system: 'database' });

// Test with your queue example
logger.debug('Received batch from queue', { 
    batchSize: 5, 
    totalReceived: 100, 
    remaining: 50 
});

console.log('\nLogger test completed!'); 