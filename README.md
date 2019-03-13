# Workers Pipeline

Limit number async operation with fashion.

## Usage

First, you need to create a class that extends `QueueWorker` having `async call` method. Some payload can be used here as well.

```js
import {QueueWorker} from "workers-pipeline"
class HardWorker extends QueueWorker {
  constructor(payload) {
    super();
    this.payload = payload;
  }
  async call(that) {
    // that is this here
    // Do something with that.payload
  }
}
```

Or in typescript:

```typescript
import {QueueWorker} from "workers-pipeline"

class HardWorker extends QueueWorker {
  private payload: any

  constructor(payload: any) {
    super()
    this.payload = payload
  }

  protected async call(that: HardWorker) {
    // that is this here
    // Do something with that.payload
  }
}
```

Second, create a `WorkersPipeline`, passing limit of parallel promises wanted to be executed at the same time. Push workers instances to the pipeline and call `pipeline.start()`, that retures promise, when all jobs are finished.

```js
  import {WorkersPipeline} from "workers-pipeline"
  const pipeline = new WorkersPipeline(2)
  
  const urlsToGet = [{url: "..."}, {url: "..."}, {url: "..."}]
  urlsToGet.each(params => {
      pipeline.push(new HardWorker(params))
      pipeline.push(new HardWorker(params))
      pipeline.push(new HardWorker(params))
  })
  
  await pipeline.start()
```
