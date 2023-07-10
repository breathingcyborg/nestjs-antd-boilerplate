import { IsNotEmpty } from "class-validator";

export class RefreshTokenRequest {
    @IsNotEmpty()
    refreshToken: string
}