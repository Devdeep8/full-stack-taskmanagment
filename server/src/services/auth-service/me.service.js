import { BaseService } from "../base.service.js";

class CurrnetUserService extends BaseService {
  async run() {
    const { args } = this.args;

    try {
      const user = await this.db.users.findByPk(args);
      if (!user) {
        throw new this.AppError("User not found", 404);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}
export default CurrnetUserService;
