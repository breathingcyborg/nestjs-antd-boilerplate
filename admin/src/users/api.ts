import axios from "../axios-client/instance";
import { SearchUserRequest, SearchUserResponse } from "./types";

const usersApi = {
    async searchUsers(request : SearchUserRequest) {
        const { data } = await axios.get<SearchUserResponse>('/admin/users/search', {
            params: request,            
        });
        return data;
    }
}

export default usersApi;