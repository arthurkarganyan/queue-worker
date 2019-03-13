"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queue_1 = require("queue");
class WorkersPipeline {
    constructor(concurrency) {
        this._concurrency = concurrency;
        this._queue = queue_1.default({ concurrency: concurrency });
    }
    push(worker) {
        this._queue.push(worker.callWrapper);
    }
    start() {
        return new Promise((res => {
            this._queue.start(function (err) {
                if (err)
                    throw err;
                res();
            });
        }));
    }
}
exports.WorkersPipeline = WorkersPipeline;
