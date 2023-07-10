import { areaUnitLabels } from "./enum-labels";
import { Property } from "./types";

export const formatArea = (property : Property) => {
    return `${parseFloat(property.area)} ${ areaUnitLabels[property.areaUnit]}`;
}