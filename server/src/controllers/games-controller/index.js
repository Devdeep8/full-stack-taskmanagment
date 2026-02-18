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
}

export default new GameController();
