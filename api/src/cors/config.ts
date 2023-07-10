import { registerAs } from "@nestjs/config";

export interface CorsConfig {
    origins: string[],
}

export default registerAs('cors', () : CorsConfig => ({
    origins: (process.env.CORS_ORIGINS || '').split(","),
}))