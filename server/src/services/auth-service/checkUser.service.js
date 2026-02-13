import { BaseService } from "../base.service.js";

class CheckUserNameService extends BaseService {
  async run() {
    const { username } = this.args; // 👈 expecting username from query or params

    if (!username) {
      throw new this.AppError("Username is required", 400);
    }

    try {
      const user = await this.db.users.findOne({
        where: { username },
        attributes: ["id"], // we only need to know if it exists
      });

      return {
        available: !user, // true if not found
      };
    } catch (error) {
      throw error;
    }
  }
}

export default CheckUserNameService;
