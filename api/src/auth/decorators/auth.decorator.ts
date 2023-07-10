import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common"
import { UserRole } from "../../users/entities/user.entity"
import { AUTH_OPTIONAL, AUTH_ROLES } from "../constants"
import { JwtAuthGuard } from "../guards/jwt-auth.guard"
import { RolesGuard } from "../guards/roles.guard"

export const Auth = (
    roles: UserRole[] = [],
    optional: boolean = false
) => {
    return applyDecorators(
        SetMetadata(AUTH_ROLES, roles),
        SetMetadata(AUTH_OPTIONAL, optional),
        UseGuards(JwtAuthGuard, RolesGuard),
    )
}