import { Navigate, useLocation } from "react-router-dom";
import { UserRole } from "../../users/enums";
import { useAuthUser } from "../hooks/useAuthUser";

export const Guest = ({
    children
} : {
    children: React.ReactElement
}) => {

    const location = useLocation();

    const {
        initialized,
        user,
    } = useAuthUser();

    // wait for store to initialize
    if (!initialized) {
        return null;
    }

    if (user && user.role === UserRole.Admin) {
        return <Navigate 
            to={
                location?.state?.rom 
                    ? location?.state.rom
                    : '/admin/dashboard'
            }
        />
    }

    return <>
        { children }
    </>
}