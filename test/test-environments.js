const { Logger } = require('./dist/index.js');

console.log('=== Testing Logger in Different Environments ===\n');

// Test 1: Local Development (default)
console.log('1. Testing LOCAL DEVELOPMENT mode:');
const localLogger = Logger.createLocalLogger({ name: 'test-local' });
localLogger.debug('Debug message in local mode', { userId: 123 });
localLogger.info('Info message in local mode', { requestId: 'abc-123' });
localLogger.error('Error message in local mode', { statusCode: 500 });

console.log('\n2. Testing PRODUCTION mode (simulated):');
// Simulate production environment
process.env.DATADOG_ENABLED = 'true';
const prodLogger = Logger.createProductionLogger({ name: 'test-production' });
prodLogger.debug('Debug message in production mode', { userId: 456 });
prodLogger.info('Info message in production mode', { requestId: 'def-456' });
prodLogger.error('Error message in production mode', { statusCode: 500 });

console.log('\n3. Testing AUTO-DETECTION:');
// Clear the environment variable to test auto-detection
delete process.env.DATADOG_ENABLED;
const autoLogger = Logger.createLogger({ name: 'test-auto' });
autoLogger.info('Auto-detected environment message', { auto: true });

console.log('\n4. Testing ERROR LOGGING:');
try {
    throw new Error('Test error for logging');
} catch (error) {
    autoLogger.logError(error, 'Caught test error');
}

console.log('\n=== Test completed! ===');
console.log('Note: In production, logs will be collected by Datadog agent from stdout'); 