import { EventEmitter } from "events";
import { ReactivePersistance, ReactivePersistanceEvents } from "./types";
import type TypedEmitter from "typed-emitter";

export class LocalStoragePersistance<T> 
    extends (EventEmitter as { new<T>(): TypedEmitter<ReactivePersistanceEvents<T>> })<T> 
    implements ReactivePersistance<T> {

    constructor(private key: string) {
        super();
        this.handleStorageEvent = this.handleStorageEvent.bind(this);
        window.addEventListener('storage', this.handleStorageEvent);
    }

    async set(value: T | null): Promise<void> {
        value === null
            ? localStorage.removeItem(this.key)
            : localStorage.setItem(this.key, JSON.stringify(value));
    }

    async get(): Promise<T | null> {
        const item = localStorage.getItem(this.key);
        if (item === null) {
            return null;
        }
        return JSON.parse(item) as T;
    }

    private async handleStorageEvent(event : StorageEvent) {
        if (event.storageArea !== localStorage) {
            return
        }
        if (event.key === null || event.key === this.key) {
            await this.notifyListeners();
        }
    }

    private async notifyListeners() {
        const state = await this.get();
        this.emit('dataChanged', state);
    }
}