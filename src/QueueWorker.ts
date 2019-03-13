export abstract class QueueWorker {
  public get callWrapper() {
    return () => {
      return this.call(this)
    }
  }

  protected abstract async call(that: QueueWorker)
}
