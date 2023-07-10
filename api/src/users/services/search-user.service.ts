import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Brackets, Repository } from "typeorm";
import { SearchUserRequest } from "../dtos/search-user-request.dto";
import { SearchUserResponse } from "../dtos/search-user-response.dto";
import { User } from "../entities/user.entity";

@Injectable()
export class SearchUserService {

    constructor(
        @InjectRepository(User)
        private userRepo : Repository<User>,
    ) {}

    async search(request: SearchUserRequest) : Promise<SearchUserResponse> {

        const qb = this.userRepo
            .createQueryBuilder('user')
            .orderBy('user.id', 'ASC')
            .andWhere(
                new Brackets((qb) => {
                    qb.where("user.email LIKE :query")
                        .orWhere("user.displayName LIKE :query")
                })
            )
            .setParameters({
                query: `%${request.query}%`,
            })
            .limit(request.limit)
            .offset(request.offset);

        const [data, total] = await qb.getManyAndCount();

        return new SearchUserResponse({
            data,
            total,
            success: true,
        });
    }
}