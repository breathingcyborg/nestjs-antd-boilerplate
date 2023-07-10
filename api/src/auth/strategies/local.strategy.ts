import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, IStrategyOptions } from "passport-local";
import { PasswordAuthService } from "../services/password-auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly passwordAuthService: PasswordAuthService) {
        const options: IStrategyOptions = {
            usernameField: 'email',
            passwordField: 'password',
        }
        super(options);
    }

    async validate(username: string, password: string) {
        const user = await this.passwordAuthService.authenticate(username, password);
        return user;
    }
}