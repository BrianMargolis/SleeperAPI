import { Operation } from './operations';
import { Cache } from './cache/cache';
import { sleep } from './util/util';

export interface NetworkManagerProps {
    maxTPS: number;
    cache: Cache;
}

interface QueuedOperation<I, O> {
    operation: Operation<I, O>;
    finished: (v: O) => void;
}

export class NetworkManager {
    private readonly q: QueuedOperation<any, any>[] = [];

    private readonly callTimes: number[] = [];
    private isPolling: boolean;

    constructor(private readonly props: NetworkManagerProps) {
        this.startPolling();
    }

    public async request<O>(operation: Operation<any, O>): Promise<O> {
        const nm = this;
        return new Promise(function (resolve) {
            if (nm.props.cache.get(operation.key())) {
                resolve(nm.props.cache.get(operation.key()));
                return;
            }

            nm.q.push({
                operation: operation,
                finished: resolve,
            });
            nm.startPolling();
        });
    }

    private async startPolling() {
        if (this.isPolling || this.q.length == 0) {
            return;
        }

        while (this.q.length > 0 && !this.shouldThrottle()) {
            this.isPolling = true;
            const dequeued = this.q.shift();
            this.callTimes.push(Date.now());
            dequeued.operation.execute().then(res => {
                this.props.cache.set(dequeued.operation.key(), res);
                return dequeued.finished(res);
            });
        }
        await sleep(250);
        this.isPolling = false;
        this.startPolling();
    }

    private shouldThrottle(): boolean {
        var n = 0;
        var now = Date.now();
        for (var i = this.callTimes.length; i--; i >= 0) {
            if (now - this.callTimes[i] > 1000) {
                break;
            }
            n++;
        }

        return n >= this.props.maxTPS;
    }
}
