import { Queue } from "bullmq";
import { logger } from "../utils/logger.js";
import { redisClient } from "../config/redis.js";

export class BaseQueue {
  constructor(name, options = {}) {
    this.name = name;
    this.queue = new Queue(name, {
      connection : redisClient.duplicate(),
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay : 2000,
        },
        removeOnComplete : 50,
        removeOnFail : 100,
        ...options.defaultJobOptions
      },
      ...options,
    });
  }

  async add (jobname , data , options = {}) {
    logger.info(`Adding job to ${this.name}`)
    return this.queue.add(jobname, data , options)
  }
}
