export interface PaginatedResponse<T> {
    data?: T[]
    total?: number
    success?: boolean
}

export interface PaginatedRequest {
    page : number
    perPage: number;
}

export interface GenericIDResponse {
    id: string
}

export type SortOrder = 'ascend' | 'descend';