import { IsNotEmpty } from "class-validator";
import { PaginationRequest } from "../../common/dtos/pagination-request.dto";

export class SearchUserRequest extends PaginationRequest {

    @IsNotEmpty()
    query: string

}