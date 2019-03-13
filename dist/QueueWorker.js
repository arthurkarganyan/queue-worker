"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueueWorker {
    get callWrapper() {
        return () => {
            return this.call(this);
        };
    }
}
exports.QueueWorker = QueueWorker;
