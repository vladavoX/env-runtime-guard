import { defineEnv } from "env-guard";

export const env = defineEnv({
	NEXT_PUBLIC_API_URL: { type: "string", required: true, mask: true },
	NEXT_PUBLIC_FEATURE_FLAG: { type: "boolean", default: false },
	NEXT_PUBLIC_ALLOWED_VALUES: {
		type: "string",
		allowed: ["a", "b", "c"],
		required: true,
	},
});
