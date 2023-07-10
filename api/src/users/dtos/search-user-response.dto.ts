import { Type } from "class-transformer";
import { PaginatedResponse } from "../../common/dtos/paginated-response.dto";
import { User } from "../entities/user.entity";
import { UserRead } from "./user-read.dto";

export class SearchUserResponse extends PaginatedResponse<User> {
    @Type(() => UserRead)
    data?: User[];
}