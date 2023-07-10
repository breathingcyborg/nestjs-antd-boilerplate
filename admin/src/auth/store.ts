import { AuthUser, TokenReponse } from "./types";
import {
    AuthStore,
    LocalStoragePersistance
} from '../libs/reactive-auth-store';

let store: AuthStore<AuthUser, TokenReponse> | null = null;

const AUTH_STORAGE_KEY = '__auth__'

export default function getStore() {
    if (store === null) {
        store = new AuthStore(
            new LocalStoragePersistance(AUTH_STORAGE_KEY),
            (userA, userB) => (userA?.id || null) === (userB?.id || null)
        )
    }
    return store;
}