// workers/excel-export.worker.js
import { BaseWorker } from "./base.worker.js";
import { db } from "../../models/index.js";
import ExcelJS from "exceljs";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, "../../public/exports");

// make sure folder exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

const COLUMNS = [
  { header: "ID", key: "id", width: 15 },
  { header: "Name", key: "name", width: 30 },
  { header: "Slug", key: "slug", width: 25 },
  { header: "Provider", key: "provider", width: 20 },
  { header: "RTP", key: "rtp", width: 10 },
  { header: "Status", key: "status", width: 12 },
  { header: "Category ID", key: "categoryId", width: 15 },
  { header: "Featured", key: "isFeatured", width: 10 },
  { header: "Tags", key: "tags", width: 30 },
  { header: "Created At", key: "createdAt", width: 20 },
];

async function processExcelJob(job) {
  const { userId, filters = {} } = job.data;

  const totalRows = await db.games.count({ where: filters });

  if (totalRows === 0) {
    return { message: "No games found", totalRows: 0, fileUrl: null };
  }

  await job.updateProgress(5);

  // save directly to file — no S3, no stream
  const fileName = `games-${userId}-${job.id}.xlsx`;
  const filePath = path.join(PUBLIC_DIR, fileName);

  const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({
    filename: filePath, // ← write directly to disk
    useStyles: true,
  });

  const sheet = workbook.addWorksheet("Games");
  sheet.columns = COLUMNS;

  const headerRow = sheet.getRow(1);
  headerRow.font = { bold: true, color: { argb: "FFFFFFFF" } };
  headerRow.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF4F81BD" },
  };
  headerRow.commit();

  const BATCH_SIZE = 1000;
  let offset = 0;
  let processed = 0;

  while (true) {
    const games = await db.games.findAll({
      where: filters,
      attributes: [
        "id",
        "name",
        "slug",
        "provider",
        "rtp",
        "status",
        "categoryId",
        "isFeatured",
        "tags",
        "createdAt",
      ],
      limit: BATCH_SIZE,
      offset,
      raw: true,
      paranoid: true,
    });

    if (games.length === 0) break;

    for (const game of games) {
      sheet
        .addRow({
          ...game,
          tags: Array.isArray(game.tags)
            ? game.tags.join(", ")
            : (game.tags ?? ""),
          isFeatured: game.isFeatured ? "Yes" : "No",
          createdAt: new Date(game.createdAt).toLocaleDateString(),
        })
        .commit();
    }

    processed += games.length;
    offset += BATCH_SIZE;

    const progress = 5 + Math.floor((processed / totalRows) * 80);
    await job.updateProgress(progress);
  }

  sheet.commit();
  await workbook.commit(); // flushes everything to disk

  await job.updateProgress(100);

  // return public URL — assumes express serves /public as static
  const BASE_URL = "http://localhost:4000";

  const fileUrl = `${BASE_URL}/exports/${fileName}`;

  return {
    fileUrl,
    totalRows,
    generatedAt: new Date().toISOString(),
  };
}

export const excelExportWorker = new BaseWorker(
  "excel-export",
  processExcelJob,
  { concurrency: 2 },
);
