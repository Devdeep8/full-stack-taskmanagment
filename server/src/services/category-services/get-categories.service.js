import { BaseService } from "../base.service.js";

export class GetCategoriesService extends BaseService {
  async run() {
    const {
      page = 1,
      limit = 10,
      offset = 0,
      filters = {},
      sortBy = "createdAt",
      order = "DESC",
      search = "",
    } = this.args;

    const { count, rows } = await this.db.categories.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      attributes: ["id", "name", "slug"],
    });

    return {
      page: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
      data: rows,
    };
  }

}

