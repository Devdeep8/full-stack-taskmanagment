import { excelExportQueue } from "../../queue/excel-export.queue.js";
import { GetGameByCategoryService } from "../../services/games-service/get-games-by-category.service.js";
import { GetGamesService } from "../../services/games-service/get-games.service.js";
import { BaseController } from "../base.controller.js";

class GameController extends BaseController {
  getGames = this.asyncHandler(async (req, res, next) => {
    const { page, limit, offset } = this.getPaginationParams(req);

    const filters = this.getFilterParams(req, [
      "categoryId",
      "categorySlug",
      "status",
      "provider",
    ]);

    const { sortBy, order } = this.getSortParams(req);

    const { search } = this.getSearchParams(req);

    const data = await this.executeService(GetGamesService, req, res, {
      page,
      limit,
      offset,
      filters,
      sortBy,
      order,
      search,
    });

    res.status(this.httpStatus.OK).json(data);
  });

  getSingleGameByCategory = this.asyncHandler(async (req, res, next) => {
    const { categorySlug, gameSlug } = req.params;
    const data = await this.executeService(GetGameByCategoryService, req, res, {
      categorySlug,
      gameSlug,
    });
    return res.status(this.httpStatus.OK).json(data);
  });

  exportGames = this.asyncHandler(async (req, res, next) => {
    const filters = this.getFilterParams(req, [
      "categoryId",
      "categorySlug",
      "status",
      "provider",
    ]);

    const userId = req.user.userId;
    console.log(userId)

    const job = await excelExportQueue.addExcelJob(userId, filters);
    return res.status(this.httpStatus.ACCEPTED).json({ jobId: job.id });
  });

  getExportStatus = this.asyncHandler(async (req, res, next) => {
    const { jobId } = req.params;

    const job = await excelExportQueue.queue.getJob(jobId);

    if (!job) {
      return res.status(this.httpStatus.NOT_FOUND).json({
        success: false,
        message: "Job not found",
      });
    }

    const state = await job.getState();
    const progress = job.progress;

    if (state === "completed") {
      return res.status(this.httpStatus.OK).json({
        state,
        progress: 100,
        result: job.returnvalue, // { fileUrl, totalRows, generatedAt }
      });
    }

    if (state === "failed") {
      return res.status(this.httpStatus.OK).json({
        state,
        progress,
        error: job.failedReason,
      });
    }

    return res.status(this.httpStatus.OK).json(
      state, // "waiting" | "active"
      progress,
    );
  });
}

export default new GameController();
