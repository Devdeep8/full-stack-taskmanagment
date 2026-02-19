
import UpdateUserService from "../../services/user-service/updateuser.service.js";
import { BaseController } from "../base.controller.js";

class UserController extends BaseController {


  updateUser = this.asyncHandler(async (req, res) => {
    const id = req.params.identifier
    const updateData = this.pickFields(req.body, [
      "name",
      "address",
      "dob",
      "gender",
      "phone",
      "state",
      "zipcode"
    ]);

    const args = {id  ,updateData };

    const data = await this.executeService(UpdateUserService, req, res, args);


    // this.setStatusCode(res, this.httpStatus.OK);
    return res.status(this.httpStatus.OK).json(data);
  });


}

export default new UserController();
