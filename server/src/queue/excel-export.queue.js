// queues/excel-export.queue.js
import { BaseQueue } from "./base.queue.js";

class ExcelExportQueue extends BaseQueue {
  constructor() {
    super("excel-export", {
      defaultJobOptions: {
        attempts: 2,          // excel gen is heavy, don't retry too many times
        backoff: {
          type: "exponential",
          delay: 5000,
        },
        removeOnComplete: 50,
        removeOnFail: 100,
      },
    });
  }

  async addExcelJob(userId, filters) {
    return this.add(
      "generate-excel",   // job name
      { userId, filters },
      { jobId: `excel-${userId}-${Date.now()}` }  // unique jobId per user request
    );
  }
}

export const excelExportQueue = new ExcelExportQueue();