import type TypedEmitter from "typed-emitter"

export type AuthState<TUser, TTokens> = {
    user: TUser | null,
    tokens: TTokens | null
}

export type ComparatorFunc<T> = (a: T | null, b: T | null) => boolean

export type ReactiveAuthStoreEvents<TUser, TTokens> = {
    initialized: () => void,
    userChanged: (user: TUser | null) => void
}

export type ReactiveAuthStore<TUser, TTokens> = TypedEmitter<ReactiveAuthStoreEvents<TUser, TTokens>> & {
    setUserComparator(comparator: ComparatorFunc<TUser>) : void
    
    getInitialized() : boolean

    setUser(user: TUser | null) : Promise<void>
    getUser() : TUser | null

    setTokens(tokens: TTokens | null) : Promise<void>
    getTokens() : TTokens | null
}

export type ReactivePersistanceEvents<T> = {
    dataChanged: (data: T | null) => void
}

export type ReactivePersistance<T> = TypedEmitter<ReactivePersistanceEvents<T>> & {
    set(value : T | null) : Promise<void>
    get() : Promise<T | null>
}