import Stripe from "stripe";
import { BaseService } from "../base.service.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export class CreatePaymentSessionService extends BaseService {
  async run() {
    const { pack, gateway } = this.args;
    const user = this.context.user;

    if (!user) {
      throw new this.error(
        "Unauthorized",
        this.httpStatus.UNAUTHORIZED
      );
    }

    if (gateway !== "stripe") {
      throw new this.error(
        "Only Stripe supported for now",
        this.httpStatus.BAD_REQUEST
      );
    }

    // 1️⃣ Fetch pack from DB (never trust frontend)

    if (!pack) {
      throw new this.error(
        "Pack not found",
        this.httpStatus.NOT_FOUND
      );
    }

    // 2️⃣ Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: user.email,

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: pack.name,
            },
            unit_amount: Math.round(pack.price * 100),
          },
          quantity: 1,
        },
      ],

      metadata: {
        userId: user.userId,
        packId: pack.id,
      },

      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/store/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/store`,
    });

    return {
      checkoutUrl: session.url,
    };
  }
}
