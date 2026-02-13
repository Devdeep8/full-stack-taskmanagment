import CheckUserNameService from "../../services/auth-service/checkUser.service.js";
import LoginService from "../../services/auth-service/login.service.js";
import CurrnetUserService from "../../services/auth-service/me.service.js";
import RegisterService from "../../services/auth-service/register.service.js";
import {
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "../../utils/cookie.js";
import { BaseController } from "../base.controller.js";

class AuthController extends BaseController {
  registerUser = this.asyncHandler(async (req, res) => {
    const registerCredentials = this.pickFields(req.body, [
      "name",
      "username",
      "email",
      "phone",
      "password",
    ]);

    const authCredentials = {
      ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_SECRET,
      REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_SECRET,
      ACCESS_TOKEN_TTL: process.env.ACCESS_TOKEN_TTL,
      REFRESH_TOKEN_TTL: process.env.REFRESH_TOKEN_TTL,
      TOKEN_ISSUER: process.env.TOKEN_ISSUER,
      requestId: req.requestId,
    };

    const args = {...registerCredentials , ...authCredentials}

    const data = await this.executeService(RegisterService, req, res , args)
    return res.status(200).json(data);
  });
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
    console.log("req.user :>> ", req.user.userId);

    const args = req.user.userId;
    const data = await this.executeService(CurrnetUserService, req, res, {
      args,
    });
    console.log("data :>> ", data);
    return res.status(200).json(data);
  });

  checkUsername = this.asyncHandler(async (req, res) => {
    console.log("req.query :>> ", req.query);
    const username = req.query.username;
    const data = await this.executeService(CheckUserNameService, req, res, {
      username,
    });
    console.log(username);
    return res.status(200).json(data);
  });
}

export default new AuthController();
