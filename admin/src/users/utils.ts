import { UserRead } from "./types";

export const getUserSelectLabel = (user: UserRead) => {
    return `${user.displayName} (${user.email})`;
}