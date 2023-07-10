import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "../../users/entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from '@nestjs/jwt';
import { TokenReponse } from "../dtos/token-response.dto";
import { RefreshTokenRequest } from "../dtos/refresh-token-request.dto";
import { isRefreshTokenPayload, JwtPayload } from "../dtos/jwt-payload.dto";
import { RefreshTokenResponse } from "../dtos/refresh-token-response.dto";
import { GenerateTokenService } from "./generate-token.service";

@Injectable()
export class TokenAuthService {

    constructor(
        @InjectRepository(User)
        private readonly usersRepo: Repository<User>,
        private readonly generateTokenService: GenerateTokenService,
        private readonly jwtService: JwtService,
    ) { }

    async authenticate(user: User) {
        const { token: accessToken, expirationTs: accessTokenExpiryTs } = await this.generateTokenService.generateAccessToken(user);
        const { token: refreshToken, expirationTs: refreshTokenExpiryTs } = await this.generateTokenService.generateRefreshToken(user);

        const response = new TokenReponse();
        response.accessToken = accessToken;
        response.accessTokenExpiryTs =accessTokenExpiryTs;
        response.refreshToken = refreshToken;
        response.refreshTokenExporyTs = refreshTokenExpiryTs;
        return response;
    }

    async refreshToken(request: RefreshTokenRequest) {
        const token = request.refreshToken;

        // verify token
        const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
        const isRefreshToken = isRefreshTokenPayload(payload);
        if (!isRefreshToken) {
            throw new BadRequestException('invalid refresh token');
        }

        // check user exists
        const user = await this.usersRepo.findOneBy({ id: payload.id });
        if (!user) {
            throw new BadRequestException('no such user');
        }

        // grant access token
        const {
            token: accessToken,
            expirationTs: accessTokenExpiryTs,
        } = await this.generateTokenService.generateAccessToken(user);

        const response = new RefreshTokenResponse();
        response.accessToken = accessToken;
        response.accessTokenExpiryTs = accessTokenExpiryTs;
        return response;
    }
}