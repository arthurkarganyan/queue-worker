import { expect } from "chai"

import { QueueWorker, WorkersPipeline } from "../src"
import delay from "delay"

class SleepyWorker extends QueueWorker {
  private res: string[]
  private number: number

  constructor(res: string[], number: number) {
    super()
    this.res = res
    this.number = number
  }

  protected async call(that: SleepyWorker) {
    for (let i = 0; i < 5; i++) {
      await delay(100)
      that.res.push(this.number.toString())
    }
  }
}

it("QueueWorker", async () => {
  const pipeline = new WorkersPipeline<SleepyWorker>(2)

  const res: string[] = []
  pipeline.push(new SleepyWorker(res, 1))
  pipeline.push(new SleepyWorker(res, 2))
  pipeline.push(new SleepyWorker(res, 3))

  await pipeline.start()
  expect(res.join('')).to.eq("121212121233333")
})
