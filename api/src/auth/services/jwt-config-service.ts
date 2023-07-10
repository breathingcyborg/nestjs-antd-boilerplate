import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt'
import { AuthConfig } from "../config/auth-config";
import { JWT_ALGO } from "../constants";

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {

    constructor(private readonly configService: ConfigService) { }

    createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
        const authConfig = this.configService.get<AuthConfig>('auth');
        return {
            secret: authConfig.secret,
            signOptions: {
                algorithm: JWT_ALGO,
            },
            verifyOptions: {
                algorithms: [JWT_ALGO],
            }
        };
    }
} 