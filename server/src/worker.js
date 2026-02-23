// worker.js
import {parentPort} from "worker_threads"


let result = 0;
console.log(`🟡 TAG → message [worker.js:6]`, Date.now());
for (let i = 0; i < 10000000000; i++) {
  result++;
}

parentPort.postMessage(result)