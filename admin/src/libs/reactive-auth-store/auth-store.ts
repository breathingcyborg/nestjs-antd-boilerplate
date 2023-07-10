import { ReactiveAuthStore, ComparatorFunc, ReactivePersistance, AuthState, ReactiveAuthStoreEvents } from './types';
import EventEmitter from 'events';
import type TypedEmitter from "typed-emitter"

export class AuthStore<TUser, TTokens>
    extends (EventEmitter as { new<TUser, TTokens>(): TypedEmitter<ReactiveAuthStoreEvents<TUser, TTokens>> })<TUser, TTokens> 
    implements ReactiveAuthStore<TUser, TTokens> {

    private initialized : boolean = false

    constructor(
        private persistance: ReactivePersistance<AuthState<TUser, TTokens>>,
        private comparator: ComparatorFunc<TUser> = (a, b) => JSON.stringify(a) !== JSON.stringify(b),
        private state: AuthState<TUser, TTokens> = { user: null, tokens: null },
    ) {
        super();
        this.onDataChange = this.onDataChange.bind(this);
        this.persistance.on('dataChanged', this.onDataChange);
        this.initialize();
    }

    setUserComparator(comparator: ComparatorFunc<TUser>): void {
        this.comparator = comparator;
    }

    getInitialized(): boolean {
        return this.initialized;
    }

    async setUser(user: TUser | null): Promise<void> {
        const oldUser = this.state.user;
        const userChanged = !this.comparator(oldUser, user);
        this.state.user = user;
        await this.persistance.set(this.state)
        if (userChanged) {
            this.notifyUserChanged();
        }
    }

    getUser(): TUser | null {
        return this.state?.user || null;
    }

    async setTokens(tokens: TTokens | null): Promise<void> {
        this.state.tokens = tokens;
        await this.persistance.set(this.state);
    }

    getTokens(): TTokens | null {
        return this.state?.tokens || null;
    }

    private async initialize() {
        const initialState = await this.persistance.get();
        this.state = initialState || this.state;
        this.initialized = true;
        this.emit('initialized');
        this.notifyUserChanged();
    }

    private onDataChange(newState: AuthState<TUser, TTokens> | null) {
        const newUser = newState?.user || null;
        const oldUser = this.state?.user || null;
        const userChanged = !this.comparator(newUser, oldUser);
        this.state = newState || {
            user: null,
            tokens: null,
        };
        if (userChanged) {
            this.notifyUserChanged();
        }
    }

    private notifyUserChanged() {
        const user = this.getUser();
        this.emit('userChanged', user);
    }
}