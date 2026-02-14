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

    if (!user) {
      throw new AppError(
        "User not found",
        this.httpStatus.NOT_FOUND,
        { code: "USER_NOT_FOUND", type: "NOT_FOUND" },
        this.serviceName
      );
    }

    // 2️⃣ Allow only specific fields to be updated
    const ALLOWED_FIELDS = ["name" , "phone" , "gender" , "dob" , "address" , "zipcode" , "state"];
    const updatePayload = {};

    for (const key of ALLOWED_FIELDS) {
      if (data?.[key] !== undefined) {
        updatePayload[key] = data[key];
      }
    }

    // 3️⃣ Block protected fields even if frontend sends them
    const BLOCKED_FIELDS = ["id", "password", "createdAt"];
    for (const key of BLOCKED_FIELDS) {
      if (key in data) {
        throw new AppError(
          `${key} cannot be updated`,
          this.httpStatus.FORBIDDEN,
          { code: "FIELD_NOT_UPDATABLE", type: "AUTHORIZATION_ERROR" },
          this.serviceName
        );
      }
    }

    // 4️⃣ Update
    await user.update(updatePayload);

    // 5️⃣ Return fresh user
    return user;
  }
}

export default UpdateUserService;
