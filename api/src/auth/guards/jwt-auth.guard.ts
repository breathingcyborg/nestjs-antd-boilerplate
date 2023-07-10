import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { AUTH_OPTIONAL } from "../constants";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    constructor(private readonly reflector: Reflector) {
        super();
    }

    async canActivate(context: ExecutionContext) {
        const authOptional = this.reflector.get<boolean>(AUTH_OPTIONAL, context.getHandler()) === true;
        const can = await (super.canActivate(context) as (boolean | Promise<boolean>));
        if (authOptional) {
            return true;
        }
        return can;
    }

}