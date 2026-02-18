import { Op } from "@sequelize/core";
import { BaseService } from "../base.service.js";

export class GetSingleCategory extends BaseService {
  async run() {
    const { identifier, filters = {}, includeGames = false } = this.args;
    // ✅ Build where clause safely
    const where = {};
    if (identifier) where.slug = identifier; // only add if exists

    // ✅ Include games if requested
    const include = [];
    if (includeGames) {
      const gameWhere = {};

      if (filters.gameName)
        gameWhere.name = { [Op.iLike]: `%${filters.gameName}%` };
      if (filters.status) gameWhere.status = filters.status;

      include.push({
        model: this.db.games,
        as: "games",
        attributes: ["id", "name", "rtp", "status", "provider", "categoryId", "slug"],
        where: Object.keys(gameWhere).length ? gameWhere : undefined, 
        required: false, // include category even if it has no games
      });
    }

    // ✅ Fetch single category
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
