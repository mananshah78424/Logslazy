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
import { Logger } from 'logslazy';

const logger = new Logger('poseidon');

export default logger;
```

## Use Logslazy
logger.info('Hello how are you doing?', {
        name: data.name,
});


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

## Publishing to npm

### Prerequisites

1. **npm account**: Make sure you have an npm account and are logged in
2. **Package ownership**: Ensure you own the `logslazy` package name on npm

### Publishing Steps

#### 1. Build the package
```bash
npm run build
```

#### 2. Test the build (recommended)
```bash
npm test
```

#### 3. Login to npm (if not already logged in)
```bash
npm login
```

#### 4. Check what will be published
```bash
npm pack --dry-run
```

#### 5. Publish to npm
```bash
npm publish
```

### Version Management

For subsequent releases, increment the version number before publishing:

#### Patch version (bug fixes)
```bash
npm version patch  # 1.0.8 → 1.0.9
npm publish
```

#### Minor version (new features)
```bash
npm version minor  # 1.0.8 → 1.1.0
npm publish
```

#### Major version (breaking changes)
```bash
npm version major  # 1.0.8 → 2.0.0
npm publish
```

### Publishing Workflow

1. **Make your changes** to the codebase
2. **Test locally**: `npm test`
3. **Build**: `npm run build`
4. **Increment version**: `npm version [patch|minor|major]`
5. **Publish**: `npm publish`
6. **Push to GitHub**: `git push && git push --tags`

### Important Notes

- The `prepublishOnly` script automatically runs `npm run build` before publishing
- Only files specified in the `"files"` field of `package.json` are included in the published package
- Version increments automatically create a git tag
- Make sure your git repository is up to date before publishing

## License

MIT 