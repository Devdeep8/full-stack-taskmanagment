import LoginService from "../../services/auth-service/login.service.js";
import CurrnetUserService from "../../services/auth-service/me.service.js";
import {
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "../../utils/cookie.js";
import { BaseController } from "../base.controller.js";

class AuthController extends BaseController {
  loginUser = this.asyncHandler(async (req, res) => {
    const loginCredentials = this.pickFields(req.body, [
      "username",
      "password",
    ]);

    const authObej = {
      ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_SECRET,
      REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_SECRET,
      ACCESS_TOKEN_TTL: process.env.ACCESS_TOKEN_TTL,
      REFRESH_TOKEN_TTL: process.env.REFRESH_TOKEN_TTL,
      TOKEN_ISSUER: process.env.TOKEN_ISSUER,
      requestId: req.requestId,
    };
    const args = { ...loginCredentials, ...authObej };

    const data = await this.executeService(LoginService, req, res, args);

    setAccessTokenCookie(res, data.data.accessToken);
    setRefreshTokenCookie(res, data.data.refreshToken);

    // this.setStatusCode(res, this.httpStatus.OK);
    return res.status(200).json(data);
  });

  me = this.asyncHandler(async (req, res) => {
    console.log('req.user :>> ', req.user.userId);

    const args = req.user.userId;
    const data = await this.executeService(CurrnetUserService, req, res, {args});
    console.log('data :>> ', data);
    return res.status(200).json(data);
  });
}

export default new AuthController();
