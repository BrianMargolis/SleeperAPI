import { Cache } from './cache';

export class InMemoryCache implements Cache {
    h: Map<string, any> = new Map();

    get<T>(key: string): T {
        return this.h.get(key);
    }
    set<T>(key: string, value: T): void {
        this.h.set(key, value);
    }
}
