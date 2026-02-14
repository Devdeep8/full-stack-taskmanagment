import { BaseService } from "../base.service.js";
import AppError from "../../utils/appError.js";

class UpdateUserService extends BaseService {
  async run() {
    const { id, updateData } = this.args;

    if (!id) {
      throw new AppError(
        "User id is required",
        this.httpStatus.BAD_REQUEST,
        { code: "USER_ID_REQUIRED", type: "VALIDATION_ERROR" },
        this.serviceName
      );
    }

    // 1️⃣ Find user
    const user = await this.db.users.findByPk(id);

    

    // 4️⃣ Update
    await user.update(updateData);

    // 5️⃣ Return fresh user
    return user;
  }
}

export default UpdateUserService;
