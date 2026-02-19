// routes/authRoutes.js

import express from "express";
import paymentController from "../../controllers/payment-controller/index.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const paymentRoutes = express.Router();

paymentRoutes.post(
  "/session",
  authMiddleware.authenticate,
  paymentController.createPaymentSession,
);
// paymentRoutes.get("/webhook" , paymentController.testhook)
paymentRoutes.post(
  "/webhook",
  paymentController.stripeWebhook,
);

export default paymentRoutes;
