export interface EnvConfig {
	type: "string" | "number" | "boolean";
	required?: boolean;
	default?: string | number | boolean;
	mask?: boolean;
	allowed?: (string | number | boolean)[];
}

export interface EnvSchema {
	[key: string]: EnvConfig;
}
