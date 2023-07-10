import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, StrategyOptions, ExtractJwt } from "passport-jwt";
import { User } from "../../users/entities/user.entity";
import { Repository } from "typeorm";
import { AuthConfig } from "../config/auth-config";
import { isAccessTokenPayload, JwtPayload } from "../dtos/jwt-payload.dto";
import { JWT_ALGO } from "../constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        configService: ConfigService,
        @InjectRepository(User)
        private usersRepo: Repository<User>,
    ) {
        const authConfig = configService.get<AuthConfig>('auth');
        const options: StrategyOptions = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: authConfig.secret,
            algorithms: [JWT_ALGO],
        }
        super(options)
    }

    async validate(payload: JwtPayload) {
        if (!isAccessTokenPayload(payload)) {
            throw new BadRequestException('invalid access token')
        }
        const user = await this.usersRepo.findOneBy({ id: payload.id });
        if (!user) {
            throw new BadRequestException('invalid access token');
        }
        return user;
    }
}