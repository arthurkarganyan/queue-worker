import { QueueWorker } from "./QueueWorker";
export declare class WorkersPipeline<T extends QueueWorker> {
    private _queue;
    private _concurrency;
    constructor(concurrency: any);
    push(worker: T): void;
    start(): Promise<void>;
}
