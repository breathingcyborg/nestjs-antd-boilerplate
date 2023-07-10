import { PaginatedRequest, SortOrder } from "../shared/types"
import { PaginatedResponse } from "../shared/types"
import { AreaUnit, LandUse, ListingType, PropertyType } from "./enums"
import { UserRead } from "../users/types"

export interface Property {
    id: string
    title: string
    description: string | null
    listingType: ListingType
    propertyType: PropertyType
    area: string
    areaUnit: AreaUnit
    floor: number | null
    totalFloors: number | null
    bhk: number | null
    landUse: LandUse | null
    frontageArea: number | null;
    user: UserRead,
    lat: string
    lng: string
    createdAt: Date
    updatedAt: Date
}

export interface CreateProperty {
    title: string
    userId: string
    description?: string | null
    listingType: ListingType
    propertyType: PropertyType
    area: string
    areaUnit: AreaUnit
    floor?: number | null
    totalFloors?: number | null
    bhk?: number | null
    landUse?: LandUse | null
    frontageArea?: number | null
    lat: string
    lng: string
}

export interface UpdateProperty extends CreateProperty {}

export enum ListPropertySortFields {
    CreatedAt = 'createdAt',
    UpdatedAt = 'updatedAt',
}

export interface ListPropertyRequest extends PaginatedRequest {
    title?: string
    listingType?: ListingType
    propertyType?: PropertyType
    sortField: ListPropertySortFields
    sortOrder: SortOrder
}

export interface ListPropertyResponse extends PaginatedResponse<Property> {}
