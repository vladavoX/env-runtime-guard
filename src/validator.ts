import type { EnvSchema } from "./schema";

export function validateEnv(
	envVars: Record<string, number | string | boolean | undefined>,
	schema: EnvSchema,
) {
	const validatedEnv: Record<string, number | string | boolean | undefined> =
		{};

	for (const key in schema) {
		const config = schema[key];
		const value = envVars[key];

		if (config.required && (value === undefined || value === "")) {
			throw new Error(`Missing required environment variable: ${key}`);
		}

		if (value !== undefined) {
			if (config.allowed && !config.allowed.includes(value)) {
				throw new Error(
					`Invalid environment variable: ${key} must be one of [${config.allowed.join(", ")}]`,
				);
			}

			switch (config.type) {
				case "number": {
					validatedEnv[key] = Number(value);
					if (Number.isNaN(validatedEnv[key])) {
						throw new Error(
							`Invalid environment variable: ${key} must be a number`,
						);
					}
					break;
				}
				case "boolean": {
					validatedEnv[key] = value === "true";
					break;
				}
				default: {
					validatedEnv[key] = value;
				}
			}
		} else {
			validatedEnv[key] = config.default;
		}
	}

	const maskValidatedEnv = maskSensitiveVariables(validatedEnv, schema);

	return maskValidatedEnv;
}

function maskSensitiveVariables(
	env: Record<string, number | string | boolean | undefined>,
	schema: EnvSchema,
) {
	const maskedEnv: Record<string, number | string | boolean | undefined> = {};
	for (const key in env) {
		if (schema[key]?.mask) {
			maskedEnv[key] = "********";
		} else {
			maskedEnv[key] = env[key];
		}
	}
	return maskedEnv;
}
