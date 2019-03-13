# Workers Pipeline

Limit number async operation with fashion. Wraps https://github.com/jessetane/queue library into class making it more practical to use.

## Usage

First, you need to create a class that extends `QueueWorker` having `async call` method. Some payload can be used here as well.

```js
const {QueueWorker} = require("workers-pipeline")
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
  const {WorkersPipeline} = require("workers-pipeline")
  const pipeline = new WorkersPipeline(2)
  
  async function main() {
    const urlsToGet = [{url: "..."}, {url: "..."}, {url: "..."}]
    urlsToGet.forEach(params => {
        pipeline.push(new HardWorker(params))
        pipeline.push(new HardWorker(params))
        pipeline.push(new HardWorker(params))
    })
  
    await pipeline.start()
  }
```
