import { IsEnum, IsOptional } from "class-validator";
import { SortOrder } from "../../common/enums/sort-order.enum";
import { PaginationRequest } from "../../common/dtos/pagination-request.dto";
import { ListingType, PropertyType } from "../enums";

export enum ListPropertySortFields {
    CreatedAt = 'createdAt',
    UpdatedAt = 'updatedAt',
}

export class ListPropertyRequest extends PaginationRequest {

    @IsOptional()
    title?: string

    @IsOptional()
    @IsEnum(ListingType)
    listingType?: ListingType

    @IsOptional()
    @IsEnum(PropertyType)
    propertyType?: PropertyType

    @IsOptional()
    @IsEnum(ListPropertySortFields)
    sortField: ListPropertySortFields = ListPropertySortFields.CreatedAt

    @IsOptional()
    @IsEnum(SortOrder)
    sortOrder: SortOrder = SortOrder.Ascending
}