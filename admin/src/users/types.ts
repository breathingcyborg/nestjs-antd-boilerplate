import { PaginatedRequest, PaginatedResponse } from "../shared/types"

export interface UserRead {
    id: string
    email?: string
    displayName?: string
}

export interface SearchUserRequest extends PaginatedRequest {
    query: string
}

export interface SearchUserResponse extends PaginatedResponse<UserRead> {}