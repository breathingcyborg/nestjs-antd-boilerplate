import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SearchUserController } from "./controller/search-user.controller";
import { User } from "./entities/user.entity";
import { SearchUserService } from "./services/search-user.service";

@Module({
    imports: [ TypeOrmModule.forFeature([ User ]) ],
    providers: [ SearchUserService ],
    controllers: [ SearchUserController ],
})
export class UsersModule {}