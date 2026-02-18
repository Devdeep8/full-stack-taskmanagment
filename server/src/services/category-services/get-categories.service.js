import { Op } from "@sequelize/core";
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

    // ✅ Build category filter
    const where = {};
    if (search) {
      where.name = { [Op.iLike]: `%${search}%` };
    }

    // ✅ Include games if requested
    const include = [];
    if (filters.games) {
      const gameWhere = {};

      if (filters.gameName) {
        gameWhere.name = { [Op.iLike]: `%${filters.gameName}%` };
      }
      if (filters.status) {
        gameWhere.status = filters.status;
      }
      if (filters.provider) {
        gameWhere.provider = filters.provider;
      }

      include.push({
        model: this.db.games,
        as: "games",
        attributes: ["id", "name", "rtp", "status", "provider", "categoryId"],
        where: Object.keys(gameWhere).length ? gameWhere : undefined,
        required: false, // categories without games will still show
      });
    }

    const { count, rows } = await this.db.categories.findAndCountAll({
      where,
      include,
      limit,
      offset,
      order: [[sortBy, order]],
      attributes: ["id", "name", "slug", "description", "createdAt", "updatedAt"],
      distinct: true, // needed when including associations
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
