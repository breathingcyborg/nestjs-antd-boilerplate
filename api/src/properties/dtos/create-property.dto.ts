import { IsDecimal, IsEnum, IsInt, IsLatitude, IsLatLong, IsLongitude, IsNotEmpty, IsOptional, IsUUID, MinLength, ValidateIf } from "class-validator"
import { AreaUnit, LandUse, ListingType, PropertyType } from "../enums"

export class CreateProperty {
    @IsNotEmpty()
    @MinLength(3)
    title: string

    @IsOptional()
    description?: string | null

    @IsUUID()
    userId?: string

    @IsNotEmpty()
    @IsEnum(ListingType)
    listingType: ListingType

    @IsNotEmpty()
    @IsEnum(PropertyType)
    propertyType: PropertyType

    @IsDecimal()
    area: string

    @IsEnum(AreaUnit)
    areaUnit: AreaUnit

    @IsLatitude()
    lat: string

    @IsLongitude()
    lng: string

    @ValidateIf(o => o.propertyType === PropertyType.Apartment)
    @IsInt()
    floor?: number | null

    @ValidateIf(o => o.propertyType === PropertyType.Apartment)
    @IsInt()
    totalFloors?: number | null

    @ValidateIf(o => o.propertyType === PropertyType.Apartment)
    @IsInt()
    bhk?: number | null

    @ValidateIf(o => o.propertyType === PropertyType.Land)
    landUse?: LandUse | null

    @ValidateIf(o => o.propertyType === PropertyType.Shop)
    frontageArea?: number | null
}