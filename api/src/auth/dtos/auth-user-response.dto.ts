import { Exclude, Expose } from "class-transformer";
import { UserRead } from "../../users/dtos/user-read.dto";
import { UserRole } from "../../users/entities/user.entity";

@Exclude()
export class AuthUserResponse extends UserRead {
    @Expose()
    role: UserRole
}