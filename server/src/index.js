import express from "express"
import {Worker} from "worker_threads"

const app = express();
const port = process.env.PORT || 3000;

// Non-blocking route
app.get("/non-blocking", (req, res) => {
    console.log(`🟡 req → testq [index.js:8]`, Date.now());
  res.status(200).send("This page is non-blocking and working.");
});

// Blocking route using Worker Threads
app.get("/blocking", (req, res) => {
    const worker = new Worker("./worker.js")
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result++;
  }
  console.log(`🟡 TAG → message [index.js:18]`, Date.now());
  res.status(200).send(`Result is ${result}`);
});

// Start the server
app.listen(port, () => {
  console.log(`App listening on port http://127.0.0.1:${port}`);
});