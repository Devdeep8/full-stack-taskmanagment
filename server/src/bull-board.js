// src/bull-board.js
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import { excelExportQueue } from "./queue/excel-export.queue.js";

// ✅ Import your EXISTING queue instances — don't create new ones

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

createBullBoard({
  queues: [ 
    new BullMQAdapter(excelExportQueue.queue, {
      allowRetries: true,
      readOnlyMode: false,
    }),
  ],
  serverAdapter,
});

export { serverAdapter };
