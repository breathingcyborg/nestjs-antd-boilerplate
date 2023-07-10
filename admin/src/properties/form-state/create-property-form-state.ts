import { CreateProperty } from '../types';

/**
 * 
 * Data representation used by create property form.
 * 
 */
export interface CreatePropertyFormState extends CreateProperty {
    user: {
        label: string,
        value: string
    },
    coordinates: [string, string],
}

/**
 * 
 * Convert from formState to api request
 * 
 */
export const toApiRequest = (formState : CreatePropertyFormState) : CreateProperty => {
    const { user, coordinates, ...restData } = formState;
    const request : CreateProperty = restData;
    request.userId = user.value;
    request.area = parseFloat(request.area).toString();
    request.lat = coordinates[0];
    request.lng = coordinates[1];
    return request;
}