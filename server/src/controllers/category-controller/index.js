import { GetCategoriesService } from "../../services/category-services/get-categories.service.js";
import { GetSingleCategory } from "../../services/category-services/GetSingleCategory.service.js";
import { BaseController } from "../base.controller.js";

class CategoryController extends BaseController {
  getCategories = this.asyncHandler(async (req, res, next) => {
    const { page, limit, offset } = this.getPaginationParams(req);

    const { sortBy, order } = this.getSortParams(req);
    const filters = this.getFilterParams(req, [
      "categorySlug",
      "status",
      "games",
      "provider",
    ]);

    const { search } = this.getSearchParams(req);

    const data = await this.executeService(GetCategoriesService, req, res, {
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

  getSingleCategory = this.asyncHandler(async (req, res, next) => {
    const { identifier } = req.params; // slug or id from URL
    const filters = this.getFilterParams(req, [
      "games",
      "status",
      "provider",
      "gameName",
    ]);
    const includeGames = filters.games === "true" || filters.games === true;

    const category = await this.executeService(GetSingleCategory, req, res, {
      identifier,
      filters,
      includeGames,
    });

    res.status(this.httpStatus.OK).json(category);
  });
}

export default new CategoryController();
