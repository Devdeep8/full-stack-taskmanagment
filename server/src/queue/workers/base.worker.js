import { Worker } from "bullmq";
import { redisClient } from "../../config/redis.js";
import { logger } from "../../utils/logger.js";

export class BaseWorker {
  constructor(queueName, processor, options = {}) {
    const { concurrency = 5, ...restOptions } = options;

    this.worker = new Worker(
      queueName,
      async (job) => {
        logger.info(`Processing job ${job.id} from ${queueName}`);
        job.updateProgress(0);
        try {
          const result = await processor(job);
          await job.updateProgress(100);
          return result;
        } catch (error) {
          console.error(`❌ Job ${job.id} failed:`, error);
          throw error;
        }
      },
      {
        connection: redisClient.duplicate(),
        concurrency,
        removeOnComplete: { count: 50 },
        removeOnFail: { count: 100 },
        ...restOptions,
      },
    );
    this.registerEvents();
  }

  registerEvents() {
    this.worker.on("completed", (job, result) => {
      logger.info(` [${this.queueName}] Job ${job.id} completed`, result ?? "");
    });
    this.worker.on("failed", (job, err) => {
      logger.error(
        `[${this.queueName}] Job ${job?.id} failed (attempt ${job?.attemptsMade}):`,
        err.message,
      );
    });
    this.worker.on("error", (err) => {
      console.error(`[${this.queueName}] Worker error:`, err.message);
    });
    this.worker.on("stalled", (jobId) => {
      console.warn(`⚠️ [${this.queueName}] Job ${jobId} stalled — will retry`);
    });
  }
  async close() {
    await this.worker.close();
  }
}
