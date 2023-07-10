import { AreaUnit, LandUse, ListingType, PropertyType } from "./enums";

export const listingTypeLabels : Record<ListingType, string> = {
    [ListingType.Rent]: 'Rent',
    [ListingType.Sale]: 'Sale',
}

export const propertyTypeLabels : Record<PropertyType, string> = {
    [PropertyType.Apartment]: 'Apartment',
    [PropertyType.Land]: 'Land',
    [PropertyType.Shop]: 'Shop'
}

export const areaUnitLabels : Record<AreaUnit, string> = {
    [AreaUnit.Acre]: 'Acre',
    [AreaUnit.Sqft]: 'Sqft',
    [AreaUnit.Sqm]: 'Sqm',
    [AreaUnit.Sqyard]: 'Sqyard',
}

export const landUseLabels : Record<LandUse, string> = {
    [LandUse.Agricultural]: 'Agricultural',
    [LandUse.NonAgricultural]: 'Non Agricultural',
}
