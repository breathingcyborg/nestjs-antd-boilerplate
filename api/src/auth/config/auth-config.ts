import { registerAs } from "@nestjs/config";

export interface AuthConfig {
    secret: string
}

export default registerAs('auth', (): AuthConfig => {
    return { secret: process.env.AUTH_JWT_SECRET }
})