import { useEffect, useState } from "react"
import { AuthUser } from "../types";
import getStore from "../store";

export const useAuthUser = () => {

    const [initialized, setInitialized] = useState(false);
    const [user, setUser] = useState<AuthUser | null>(null);

    useEffect(() => {

        const store = getStore();

        const onInitialized = () => {
            setInitialized(true);
        }

        const onUserChanged = (user: AuthUser | null) => {
            setUser(user);
        }
        
        // initial values
        setInitialized(store.getInitialized());
        setUser(store.getUser());

        // listen to changes
        store.on('initialized', onInitialized);
        store.on('userChanged', onUserChanged);

        return () => {
            // cleanup
            store.off('initialized', onInitialized);
            store.off('userChanged', onUserChanged);
        }
    }, []);

    return { initialized, user }
}