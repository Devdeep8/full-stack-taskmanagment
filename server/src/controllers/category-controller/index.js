import { GetCategoriesService } from "../../services/category-services/get-categories.service.js";
import { BaseController } from "../base.controller.js";

class CategoryController extends BaseController {
  getCategories = this.asyncHandler(async (req, res, next) => {
    const { page, limit, offset } = this.getPaginationParams(req);


    const { sortBy, order } = this.getSortParams(req);

    const { search } = this.getSearchParams(req);

    const data = await this.executeService(GetCategoriesService, req, res, {
      page,
      limit,
      offset,
      sortBy,
      order,
      search,
    });

    res.status(this.httpStatus.OK).json(data)
  });
}


export default new CategoryController()