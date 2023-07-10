import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../../users/entities/user.entity";
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from "../constants";
import { JwtPayload } from "../dtos/jwt-payload.dto";
import * as ms from 'ms';

@Injectable()
export class GenerateTokenService {

    constructor(private readonly jwtService: JwtService) { }

    async generateAccessToken(user: User) {
        const payload: JwtPayload = {
            id: user.id,
            tokenType: 'access'
        }
        const expiresIn = ms(ACCESS_TOKEN_EXPIRY);
        const expiration = this.getExpirationDate(expiresIn);
        const token = await this.jwtService.signAsync(payload, {
            expiresIn,
        });
        return this.perpareTokenResponse(token, expiration);
    }

    async generateRefreshToken(user: User) {
        const payload: JwtPayload = {
            id: user.id,
            tokenType: 'refresh'
        }
        const expiresIn = ms(REFRESH_TOKEN_EXPIRY);
        const expiration = this.getExpirationDate(expiresIn);
        const token = await this.jwtService.signAsync(payload, {
            expiresIn,
        });
        return this.perpareTokenResponse(token, expiration);
    }

    private perpareTokenResponse(token: string, expiration: Date) {
        const expirationTs = Math.floor(expiration.getTime() / 1000);
        return { token, expirationTs };
    }

    private getExpirationDate(ms : number) {
        let date = new Date();
        date.setTime(date.getTime() + ms);
        return date;
    }  
}