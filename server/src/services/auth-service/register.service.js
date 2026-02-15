import { TokenService } from "../token-service/token.service.js";
import { BaseService } from "../base.service.js";
import bcrypt from "bcryptjs";

class RegisterService extends BaseService {
  async run() {
    const { name, username, email, phone, password } = this.args;
    const {
      ACCESS_TOKEN_SECRET,
      REFRESH_TOKEN_SECRET,
      ACCESS_TOKEN_TTL,
      REFRESH_TOKEN_TTL,
      TOKEN_ISSUER,
      requestId,
    } = this.args;
    const config = {
      ACCESS_TOKEN_SECRET,
      REFRESH_TOKEN_SECRET,
      ACCESS_TOKEN_TTL,
      REFRESH_TOKEN_TTL,
      TOKEN_ISSUER,
      requestId,
    };

    if (!name) {
      throw new this.error("Name is required", this.httpStatus.BAD_REQUEST);
    }
    if (!email) {
      throw new this.error("Email is required", this.httpStatus.BAD_REQUEST);
    }
    if (!password) {
      throw new this.error("Password is required", this.httpStatus.BAD_REQUEST);
    }

    const existingUser = await this.db.users.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new this.error("User already exists", this.httpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const { user, wallet } = await this.db.sequelize.transaction(async (t) => {
      const user = await this.db.users.create(
        {
          name,
          email,
          username,
          phone,
          password: hashedPassword,
        },
        { transaction: t },
      );

      const wallet = await this.db.wallet.create(
        {
          userId: user.id,
          balance: 0,
          currency: "USD",
        },
        { transaction: t },
      );

      return { user, wallet };
    });

    const tokenService = new TokenService(config);
    const payload = {
      userId: user.id,
    };

    const accessToken = tokenService.createAccessToken(payload);
    const refreshToken = tokenService.createRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        wallet: {
          balance: wallet.balance,
          currency: wallet.currency,
        },
      },
    };
  }
}

export default RegisterService;
