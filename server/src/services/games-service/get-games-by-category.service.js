import { BaseService } from "../base.service.js";

export class GetGameByCategoryService extends BaseService {
  async run() {
    const { categorySlug, gameSlug } = this.args;

    if (!categorySlug || !gameSlug) {
      throw new this.error(
        "categorySlug and gameSlug are required",
        this.httpStatus.BAD_REQUEST,
      );
    }

    const game = await this.db.games.findOne({
      where: {
        slug: gameSlug,
      },
      include: [
        {
          model: this.db.categories,
          as: "category",
          where: {
            slug: categorySlug,
          },
        },
      ],
    });

    if (!game) {
      throw new this.error("Game not found", this.httpStatus.NOT_FOUND);
    }

    return game
  }
}
