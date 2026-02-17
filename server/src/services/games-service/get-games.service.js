// src/services/game/get-games.service.js
import { Op } from "@sequelize/core";
import { BaseService } from "../base.service.js";
import { db } from "../../models/index.js";

export class GetGamesService extends BaseService {
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

    const where = {};
    // ✅ Apply Filters
    if (filters.categoryId) where.categoryId = filters.categoryId;
    if (filters.status) where.status = filters.status;
    if (filters.provider) where.provider = filters.provider;

    // ✅ Search by name
    if (search) {
      where.name = {
        [Op.iLike]: `%${search}%`,
      };
    }

    const { count, rows } = await db.games.findAndCountAll({
      where,
      limit,
      offset,
      order: [[sortBy, order]],
      include: [
        {
          model: this.db.categories, // inverse from Category.hasMany
          attributes: ["id", "name"],
        },
      ],
    });

    if(!count) throw new this.error("Games not their " , this.httpStatus.BAD_REQUEST , {} ,GetGamesService )

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
