import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { User } from "../../users/entities/user.entity";
import { AUTH_OPTIONAL, AUTH_ROLES } from "../constants";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext) {
        const roles = this.reflector.get<string[]>(AUTH_ROLES, context.getHandler());
        const optional = this.reflector.get<boolean>(AUTH_OPTIONAL, context.getHandler()) === true;

        if (!roles || roles.length <= 0 || optional) {
            return true;
        }

        const request: Request = context.switchToHttp().getRequest();
        const user = request.user as User | null;
        return matchRoles(user, roles);
    }
}

const matchRoles = (user: User | null, roles: string[]) => {
    if (!user) {
        return false;
    }
    return roles.includes(user.role);
}