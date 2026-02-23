import Stripe from "stripe";
import { BaseService } from "../../base.service.js";
import { CreditWalletService } from "../../wallet-service/credit-coins.service.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export class StripeWebhookService extends BaseService {
  async run() {
    const { rawBody, signature } = this.args;

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err) {
      console.log("err :>> ", err);
      return {
        message: "Failled SucessFully",
      };
    }

    // ✅ 2. Only Handle Successful Checkout
    if (event.type !== "checkout.session.completed") {
      return { ignored: true };
    }

    const session = event.data.object;
    console.log("session :>> ", session);

    const { userId, packId } = session.metadata || {};

    if (!userId || !packId) {
      throw new this.error(
        "Missing metadata in Stripe session",
        this.httpStatus.BAD_REQUEST,
      );
    }

    // ✅ 3. Call Credit Wallet Service
    const creditService = new CreditWalletService(
      {
        userId,
        packId: Number(packId),
        stripeSessionId: session.id,
        amountTotal: session.amount_total, // in cents
        currency: session.currency,
      },
      this.context,
    );

    await creditService.execute();

    return { success: true };
  }
}
