import { BaseService } from "../base.service.js";
import { PACKS } from "../../constants/payments-packs.js";

export class CreditWalletService extends BaseService {
  async run() {
    const {
      userId,
      packId,
      stripeSessionId,
      amountTotal, // in cents from Stripe
      currency,
    } = this.args;

    console.log(
      `🟡 creditservice → message [credit-coins.service.js:14]`,
      this.args,
    );

    const { payments, wallets, walletTransactions, sequelize } = this.db;

    if (!userId || !packId || !stripeSessionId) {
    
    }

    const pack = PACKS.find((p) => p.id === Number(packId));

    if (!pack) {
      throw new this.error("Invalid pack selected", 400);
    }

    const expectedAmount = Math.round(pack.price * 100);

    if (amountTotal !== expectedAmount) {
      throw new this.error("Amount mismatch detected", 400);
    }
    console.log("pack :>> ", pack);

    // ✅ Start a transaction
    return await sequelize.transaction(async (transaction) => {
      // 1️⃣ Check if payment already exists
      const existingPayment = await payments.findOne({
        where: { stripeSessionId },
        transaction,
        lock: true,
      });
      console.log("existing :>> ", existingPayment);

      if (existingPayment) {
        return { message: "Payment already processed" };
      }

      // 2️⃣ Find user's wallet
      const wallet = await wallets.findOne({
        where: { userId },
        transaction,
        lock: true,
      });

      if (!wallet) {
        throw new this.error("Wallet not found", 404);
      }

      // 3️⃣ Update wallet balances
      wallet.goldCoinBalance =
        Number(wallet.goldCoinBalance) + Number(pack.goldCoins);
      wallet.sweepCoinBalance =
        Number(wallet.sweepCoinBalance) + Number(pack.sweepCoins);
      wallet.redeemableSweepCoinBalance =
        Number(wallet.redeemableSweepCoinBalance) + Number(pack.rsc);

      await wallet.save({ transaction });

      console.log("wallet :>> ", wallet);
      // 4️⃣ Create payment record 
      await payments.create(
        {
          userId,
          stripeSessionId,
          packId,
          amount: pack.price,
          currency,
          status: "completed",
        },
        { transaction },
      );

      // 5️⃣ Create wallet transaction (ledger)
      await walletTransactions.create(
        {
          walletId: wallet.id,
          userId,
          type: "credit",
          goldCoins: pack.goldCoins,
          sweepCoins: pack.sweepCoins,
          redeemableSweepCoins: pack.rsc,
          source: "stripe",
          referenceId: stripeSessionId,
          description: `Purchase of ${pack.name}`,
        },
        { transaction },
      );

      // ✅ If we reach here, transaction is committed automatically
      return { success: true };
    });
  }
}
