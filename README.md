# EnvGuard

EnvGuard is a lightweight runtime environment variable validator for Node.js and frontend applications. It ensures that required environment variables are set, validates types, enforces allowed values, and masks sensitive data in logs.

## 🚀 Features

- ✅ **Validates environment variables at runtime**
- 🔥 **Enforces required variables**
- 🔢 **Supports type validation (string, number, boolean)**
- ⚙️ **Allows specifying default values**
- 🎯 **Restricts values to allowed lists**
- 🔒 **Masks sensitive variables in logs**

## 📦 Installation

### Using Bun
```sh
bun add path/to/env-guard --dev
```

### Using Yarn
```sh
yarn add path/to/env-guard -D
```

### Using npm
```sh
npm install path/to/env-guard --save-dev
```

## 📖 Usage

### Define Environment Schema

Create an `env.ts` file to validate environment variables at runtime:

```ts
import { defineEnv } from "env-guard";

export const env = defineEnv({
    NODE_ENV: { type: "string", required: true, allowed: ["development", "production"] },
    PORT: { type: "number", required: true, default: 3000 },
    DATABASE_URL: { type: "string", required: true, mask: true },
    FEATURE_FLAG: { type: "boolean", default: false },
});
```

### Use in Your Application

Import `env` and use the validated values safely:

```ts
import { env } from "./env";

console.log(`🚀 Running in ${env.NODE_ENV} mode on port ${env.PORT}`);
```

If a required variable is missing or invalid, the app **crashes early** with a clear error message.

## 🔒 Logging Masked Variables

To prevent sensitive data leaks, variables with `mask: true` are masked in logs:

```ts
// Example schema
const schema = {
    SECRET_KEY: { type: "string", required: true, mask: true }
};

// Logs will output: SECRET_KEY: ********
console.log(env);
```

## 🧪 Testing

To run tests:

```sh
bun test  # Using Bun
```

## 🤝 Contributing

Feel free to submit issues or pull requests to improve EnvGuard! Contributions are always welcome. 🚀

## 📜 License

MIT License
