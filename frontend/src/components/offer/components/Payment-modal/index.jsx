"use client";

import Modal from "@/common/components/Modal";
import { PaymentSession } from "@/services/post-service";

export default function PaymentMethodDialog({ pack, onClose, isOpen }) {
  const handlePayment = async (gateway) => {
    const payload = {
      pack,
      gateway,
    };
    const res = await PaymentSession(payload);
    const data = res.data
    console.log(data)

    if (data.checkoutUrl) {
      window.location.href = data.checkoutUrl;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton={false} className={"overflow-hidden  "} >
      <div className="  flex items-center justify-center  bg-background">
        <div className=" p-6 rounded-lg w-96">
          <h2 className="text-xl font-bold mb-4">Choose Payment Method</h2>

          <button
            onClick={() => handlePayment("stripe")}
            className="w-full bg-blue-600 py-2 rounded mb-3"
          >
            Pay with Card (Stripe)
          </button>

          <button
            onClick={() => handlePayment("razorpay")}
            className="w-full bg-green-600 py-2 rounded mb-3"
          >
            Pay with UPI (Razorpay)
          </button>

          <button
            onClick={onClose}
            className="w-full text-sm text-gray-400 mt-3"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
