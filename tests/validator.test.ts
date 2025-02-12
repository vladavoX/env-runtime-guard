import { expect, test, describe, jest } from "bun:test";
import type { EnvSchema } from "../src";
import { validateEnv } from "../src/validator";

describe("validator", () => {
	test("Validate required environment variables", () => {
		const schema: EnvSchema = {
			DATABASE_URL: { type: "string", required: true },
		};
		expect(() => validateEnv({}, schema)).toThrow(
			"Missing required environment variable: DATABASE_URL",
		);
	});

	test("Apply default values to missing environment variables", () => {
		const schema: EnvSchema = {
			DATABASE_URL: { type: "string", default: "postgres://localhost:5432" },
		};
		const env = validateEnv({}, schema);
		expect(env.DATABASE_URL).toBe("postgres://localhost:5432");
	});

	test("Validate allowed values", () => {
		const schema: EnvSchema = {
			NODE_ENV: { type: "string", allowed: ["development", "production"] },
		};
		expect(() => validateEnv({ NODE_ENV: "test" }, schema)).toThrow(
			"Invalid environment variable: NODE_ENV must be one of [development, production]",
		);
	});

	test("Convert numbers correctly", () => {
		const schema: EnvSchema = {
			PORT: { type: "number", required: true },
		};
		const env = validateEnv({ PORT: "4000" }, schema);
		expect(env.PORT).toBe(4000);
	});

	test("Convert booleans correctly", () => {
		const schema: EnvSchema = {
			DEBUG: { type: "boolean", required: true },
		};
		const env = validateEnv({ DEBUG: "true" }, schema);
		expect(env.DEBUG).toBe(true);
	});

	test("should mask sensitive variables in logs", () => {
		const schema: EnvSchema = {
			SECRET_KEY: { type: "string", required: true, mask: true },
		};
		const envVars = validateEnv({ SECRET_KEY: "mySecret" }, schema);
		console.log = jest.fn();
		console.log(envVars);
		expect(console.log).toHaveBeenCalledWith(
			expect.objectContaining({ SECRET_KEY: "********" }),
		);
	});
});
