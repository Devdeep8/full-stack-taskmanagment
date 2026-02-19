import { CreatePaymentSessionService } from "../../services/payment-service/create-session.service.js";
import { StripeWebhookService } from "../../services/payment-service/webhooks/stripe-webhook.service.js";
import { BaseController } from "../base.controller.js";

class PaymentController extends BaseController {
  createPaymentSession = this.asyncHandler(async (req, res) => {
    const paymentFields = this.pickFields(req.body, ["pack", "gateway"]);

    const args = {
      ...paymentFields,
    };

    const data = await this.executeService(
      CreatePaymentSessionService,
      req,
      res,
      args,
    );

    return res.status(this.httpStatus.OK).json(data);
  });
  testhook = this.asyncHandler(async (req, res) => {
    return res.status(this.httpStatus.OK).json({ message: "working" });
  });

  stripeWebhook = this.asyncHandler(async (req, res) => {
    const data = await this.executeService(StripeWebhookService, req, res, {
      rawBody: req.rawBody,
      signature: req.headers["stripe-signature"],
    });

    console.log(`🟡 data → success [index.js:32]`, data);

    return res.status(200).json({ received: true });
  });
}

export default new PaymentController();
