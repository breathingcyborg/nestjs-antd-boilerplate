import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { comparePassword } from "../utils/password";

@Injectable()
export class PasswordAuthService {

    constructor(
        @InjectRepository(User)
        private readonly usersRepo: Repository<User>,
    ) { }

    async authenticate(email: string, password: string) {

        const user = await this.usersRepo.createQueryBuilder("user")
            .andWhere("user.email = :email", { email })
            .addSelect("user.passwordHash")
            .getOne();

        if (!user) {
            throw new BadRequestException('user not found');
        }
        const passwordMatch = await comparePassword(password, user.passwordHash);
        if (!passwordMatch) {
            throw new BadRequestException('invalid password');
        }
        return user;
    }
}