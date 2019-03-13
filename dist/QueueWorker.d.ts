export declare abstract class QueueWorker {
    readonly callWrapper: () => any;
    protected abstract call(that: QueueWorker): any;
}
