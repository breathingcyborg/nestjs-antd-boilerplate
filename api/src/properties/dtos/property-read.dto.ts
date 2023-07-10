import { Exclude, Expose, Type } from "class-transformer";
import { UserRead } from "src/users/dtos/user-read.dto";
import { AreaUnit, LandUse, ListingType, PropertyType } from "../enums";

@Exclude()
export class PropertyRead {
    @Expose()
    id: string

    @Expose()
    title: string

    @Expose()
    @Type(() => UserRead)
    user?: UserRead

    @Expose()
    description: string | null

    @Expose()
    listingType: ListingType

    @Expose()
    propertyType: PropertyType

    @Expose()
    area: string

    @Expose()
    areaUnit: AreaUnit

    @Expose()
    floor: number | null

    @Expose()
    totalFloors: number | null

    @Expose()
    bhk: number | null

    @Expose()
    landUse: LandUse | null

    @Expose()
    frontageArea: number | null;

    @Expose()
    lat: string

    @Expose()
    lng: string

    @Expose()
    createdAt: Date

    @Expose()
    updatedAt: Date
}