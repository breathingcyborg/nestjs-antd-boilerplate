import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../users/entities/user.entity";
import { Repository } from "typeorm";
import { SignupRequest } from "../dtos/signup-request.dto";
import { hashPassword } from "../utils/password";

@Injectable()
export class SignupService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepo: Repository<User>,
    ) { }


    async signup(request: SignupRequest) {

        // check email unique
        const sameEmailCount = await this.usersRepo.countBy({ email: request.email });
        if (sameEmailCount > 0) {
            throw new BadRequestException('email is already taken');
        }

        // create user
        const user = new User();
        user.email = request.email;
        user.passwordHash = await hashPassword(request.password);
        user.displayName = request.displayName;
        await this.usersRepo.save(user);

        // return user
        return user;
    }
}