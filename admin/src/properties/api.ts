import { CreateProperty, ListPropertyRequest, ListPropertyResponse, Property, UpdateProperty } from "./types"
import { GenericIDResponse } from "../shared/types"
import axios from '../axios-client/instance';

const propertiesApi = {

    async create(request: CreateProperty) {
        const { data } = await axios.post<GenericIDResponse>('/admin/properties', request);
        return data;
    },

    async update(id: string, request: UpdateProperty) {
        const { data } = await axios.patch<void>(`/admin/properties/${id}`, request);
        return data;
    },

    async findOne(id: string) {
        const { data } = await axios.get<Property>(`/admin/properties/${id}`);
        return data;
    },

    async index(request: ListPropertyRequest) {
        const { data } = await axios.get<ListPropertyResponse>('/admin/properties', {
            params: request,
        });
        return data;
    }
}

export default propertiesApi;