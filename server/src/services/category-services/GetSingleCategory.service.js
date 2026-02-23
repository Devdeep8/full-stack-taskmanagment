import { Op } from "@sequelize/core";
import { BaseService } from "../base.service.js";

export class GetSingleCategory extends BaseService {
  async run() {
    const { identifier, filters = {}, includeGames = false } = this.args;

    const where = {};
    if (identifier) where.slug = identifier;

    const include = [];

    if (includeGames) {
      const gameWhere = {};

      if (filters.gameName)
        gameWhere.name = { [Op.iLike]: `%${filters.gameName}%` };

      if (filters.status) gameWhere.status = filters.status;

      include.push({
        model: this.db.games,
        as: "games",
        attributes: [
          "id",
          "name",
          "rtp",
          "status",
          "provider",
          "categoryId",
          "slug",
          "createdAt",
        ],
        where: Object.keys(gameWhere).length ? gameWhere : undefined,
        required: false,

        limit: 25,
        order: [["createdAt", "DESC"]],
      });
    }

    const category = await this.db.categories.findOne({
      where,
      include,
      attributes: [
        "id",
        "name",
        "slug",
        "description",
        "createdAt",
        "updatedAt",
      ],
    });

    if (!category) {
      throw new this.error("Category not found", this.httpStatus.NOT_FOUND);
    }

    return category;
  }
}