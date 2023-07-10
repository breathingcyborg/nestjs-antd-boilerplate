import { Type } from "class-transformer";
import { PaginatedResponse } from "../../common/dtos/paginated-response.dto";
import { Property } from "../entities/property.entity";
import { PropertyRead } from "./property-read.dto";

export class ListPropertyResponse extends PaginatedResponse<Property>{
    @Type(() => PropertyRead)
    data?: Property[];
}