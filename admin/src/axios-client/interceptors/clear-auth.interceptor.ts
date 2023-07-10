import { AxiosResponse } from "axios";
import { clearAuthState } from '../../auth/helper-methods';

const clearAuthInterceptor = async (response : AxiosResponse<any, any>) => {
    if (response.status === 401) {
        clearAuthState()
    }
    return response;
}

export default clearAuthInterceptor;