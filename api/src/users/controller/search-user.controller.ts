import { Controller, Get, Query, SerializeOptions } from "@nestjs/common";
import { Auth } from "../../auth/decorators/auth.decorator";
import { SearchUserRequest } from "../dtos/search-user-request.dto";
import { SearchUserResponse } from "../dtos/search-user-response.dto";
import { UserRole } from "../entities/user.entity";
import { SearchUserService } from "../services/search-user.service";

@Controller("/admin/users/search")
@Auth([ UserRole.Admin ])
export class SearchUserController {
    constructor(
        private readonly service : SearchUserService,
    ) {}

    @Get("")
    @SerializeOptions({ type: SearchUserResponse })
    async search(
        @Query() request : SearchUserRequest
    ) {
        return this.service.search(request);
    }
}