import fetch from 'node-fetch';
import { SLEEPER_BASE_DOMAIN } from '../constants';
import { Operation } from './operation';

export interface Request {
    path: string;
}

export interface Response {}

export abstract class SleeperOperation<I, O> extends Operation<I, O> {
    constructor(protected readonly request: Request) {
        super();
    }

    public abstract execute(): Promise<O>;

    public async _execute(): Promise<any> {
        const path = SLEEPER_BASE_DOMAIN + this.request.path;
        return fetch(path).then(response => response.json());
    }

    public key(): string {
        return JSON.stringify(this.request);
    }
}
