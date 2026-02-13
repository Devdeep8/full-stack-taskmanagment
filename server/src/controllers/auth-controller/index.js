import LoginService from "../../services/auth-service/login.service.js";
import { BaseController } from "../base.controller.js";
class AuthController extends BaseController{
    loginUser = this.asyncHandler(async(req ,res) => {
        const loginCredentials = this.pickFields(req.body , [
            "username" , "password"
        ])

        await this.executeService(LoginService ,req , res ,{loginCredentials} )
        this.setStatusCode(res , this.httpStatus.OK);

    })
}


export default new AuthController()