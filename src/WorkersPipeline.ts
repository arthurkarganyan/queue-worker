import Queue from "queue"
import queue from "queue"
import { QueueWorker } from "./QueueWorker"

export class WorkersPipeline<T extends QueueWorker> {
  private _queue: Queue
  private _concurrency: number

  constructor(concurrency) {
    this._concurrency = concurrency
    this._queue = queue({ concurrency: concurrency })
  }

  public push(worker: T) {
    this._queue.push(worker.callWrapper)
  }

  public start(): Promise<void> {
    return new Promise((res => {
      this._queue.start(function(err) {
        if (err) throw err
        res()
      })
    }))
  }
}
