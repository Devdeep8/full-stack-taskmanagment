import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";
import { setAccessTokenCookie } from "../utils/cookie.js";
import { httpStatus } from "../utils/http-status.js";
import { TokenService } from "../services/token-service/token.service.js";
import { db } from "../models/index.js";

const tokenService = new TokenService({
  ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_SECRET,
  REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_SECRET,
  ACCESS_TOKEN_TTL: process.env.ACCESS_TOKEN_TTL,
  REFRESH_TOKEN_TTL: process.env.REFRESH_TOKEN_TTL,
  TOKEN_ISSUER: process.env.TOKEN_ISSUER,
});

class AuthMiddleware {
  constructor() {
    this.authenticate = this.authenticate.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  // ===============================
  // MAIN AUTHENTICATION
  // ===============================
  async authenticate(req, res, next) {
    const accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;
    // (accessToken , "1");
    if (!refreshToken) {
      return res.status(401).json({ message: "refresh token is not their" });
    }

    if (!accessToken) return this.handleRefresh(req, res, next);

    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
      if (decoded.typ !== "access") return this.handleRefresh(req, res, next);

      const id = decoded.userId;

      const sessionKey = `session:${id}`;
      const sessionStr = await req.context.redis.get(sessionKey);




      if (!sessionStr) {
        console.log(true)
        return res.status(401).json({ message: "Session expired or invalid" });
      }

      const session = JSON.parse(sessionStr);
       

      // Optional: check if accessToken matches Redis stored token
      if (session.accessToken !== accessToken) {
        return res.status(401).json({ message: "Token mismatch" });
      }


      // Attach user from JWT
      req.user = {
        userId: session.userId,
        username: session.username,

        name: session.name,
        email: session.email,
      };


      // ("middleware 1 run")
      return next();
    } catch (err) {
      return this.handleRefresh(req, res, next);
    }
  }

  // ===============================
  // REFRESH HANDLER
  // ===============================
  async handleRefresh(req, res, next) {
    ("Start");
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    try {
      const decodedRefresh = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET,
      );

      if (decodedRefresh.typ !== "refresh") {
        return res.status(401).json({ message: "Invalid token type" });
      }

      const id = decodedRefresh.userId;

      // Fetch user only to get permissions
      const user = await db.users.findByPk(id);

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const newAccessToken = tokenService.createAccessToken({
        userId: user.id,
      });
      setAccessTokenCookie(res, newAccessToken);
      req.user = {
        userId: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
      };

      return next();
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthMiddleware();
