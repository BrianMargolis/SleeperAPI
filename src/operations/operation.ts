export abstract class Operation<I, O> {
    constructor() {}

    public abstract execute(): Promise<O>;

    public abstract key(): string;
}
