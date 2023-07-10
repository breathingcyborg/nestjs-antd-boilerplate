import { Body, Controller, Get, Post, Req, SerializeOptions, UseGuards } from "@nestjs/common";
import { SignupRequest } from "../dtos/signup-request.dto";
import { LocalAuthGuard } from "../guards/local-auth.guard";
import { TokenAuthService } from "../services/token-auth.service";
import { Request } from "express";
import { User } from "../../users/entities/user.entity";
import { TokenReponse } from "../dtos/token-response.dto";
import { RefreshTokenRequest } from "../dtos/refresh-token-request.dto";
import { RefreshTokenResponse } from "../dtos/refresh-token-response.dto";
import { AuthUser } from "../decorators/auth-user.decorator";
import { Auth } from "../decorators/auth.decorator";
import { SignupService } from "../services/signup.service";
import { AuthUserResponse } from "../dtos/auth-user-response.dto";


@Controller("/auth")
export class AuthController {

    constructor(
        private readonly signupService: SignupService,
        private readonly tokenAuthService: TokenAuthService
    ) { }

    @Post("/sign-up")
    async signup(@Body() request: SignupRequest) {
        await this.signupService.signup(request);
    }

    @Post("/login")
    @UseGuards(LocalAuthGuard)
    async login(@Req() request: Request): Promise<TokenReponse> {
        return this.tokenAuthService.authenticate(request.user as User);
    }

    @Post("/refresh-token")
    async refreshToken(@Body() request: RefreshTokenRequest): Promise<RefreshTokenResponse> {
        return this.tokenAuthService.refreshToken(request);
    }

    @Get('/me')
    @SerializeOptions({ type: AuthUserResponse })
    @Auth()
    async me(@AuthUser() user: User) {
        return user
    }
}