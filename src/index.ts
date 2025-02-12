import { loadEnv } from "./loader";
import type { EnvConfig, EnvSchema } from "./schema";
import { validateEnv } from "./validator";

export function defineEnv(schema: EnvSchema) {
	const envVars = loadEnv();
	return validateEnv(envVars, schema);
}

export type { EnvSchema, EnvConfig };
