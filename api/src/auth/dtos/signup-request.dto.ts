import { IsEmail, IsNotEmpty, IsStrongPassword, MaxLength } from "class-validator"

export class SignupRequest {

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
    })
    password: string

    @IsNotEmpty()
    @MaxLength(100)
    displayName: string

}