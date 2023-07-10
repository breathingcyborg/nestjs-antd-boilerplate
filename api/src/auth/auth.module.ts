import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { AuthController } from "./controller/auth.controller";
import { TokenAuthService } from "./services/token-auth.service";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from "@nestjs/config";
import { JwtConfigService } from "./services/jwt-config-service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { SignupService } from "./services/signup.service";
import { GenerateTokenService } from "./services/generate-token.service";
import { PasswordAuthService } from "./services/password-auth.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useClass: JwtConfigService,
        }),
        ConfigModule,
    ],
    providers: [
        GenerateTokenService,
        SignupService,
        TokenAuthService,
        PasswordAuthService,
        LocalStrategy,
        JwtStrategy,
    ],
    controllers: [
        AuthController,
    ]
})
export class AuthModule { }