import { getUserSelectLabel } from "../../users/utils";
import { Property, UpdateProperty } from "../types";

/**
 * Data representation used by update property form.
 */
export interface UpdatePropertyFormState extends UpdateProperty {
    user: {
        value: string,
        label: string,
    },
    coordinates: [number, number],
}

/**
 * Convert property to formState
 */
export const toFormState = (property : Property) : UpdatePropertyFormState =>  {
    const { user, ...restData } = property;
    const request : UpdatePropertyFormState = {
        ...restData,
        ...{ user: { value: user.id, label: getUserSelectLabel(user) } },
        userId: user.id,
        coordinates: [Number(property.lat), Number(property.lng)],
    };
    return request;
}

/**
 * Convert formState to api request
 */
export const toApiRequest = (formState : UpdatePropertyFormState) : UpdateProperty => {
    const { user, coordinates, ...restData } = formState;
    const request : UpdateProperty = restData;
    request.userId = user.value;
    request.area = request.area.toString();
    request.lat = coordinates[0].toString();
    request.lng = coordinates[1].toString();
    return request;
}