"use client";
import { useState } from "react";
import OfferCard from "@/common/components/offer-card";
import { PACKS } from "./constants/packs";
import PaymentMethodDialog from "./components/Payment-modal";

export const StoreComponent = () => {
  const [selectedPack, setSelectedPack] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleBuy = (pack) => {
    // TODO: wire to your payment service (Stripe etc)
    setIsOpen(true)
    setSelectedPack(pack);
    console.log("Buying pack:", pack);
  };

  return (
    <div className="  text-white px-6 py-12">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-10 text-center">
        <p className="text-xs font-bold tracking-[4px] text-yellow-400/60 uppercase mb-2">
          Okey Store
        </p>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Buy Coins
        </h1>
      </div>

      {/* Pack cards grid */}
      <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-5">
        {PACKS.map((pack) => (
          <OfferCard key={pack.id} {...pack} onBuy={() => handleBuy(pack)} />
        ))}
      </div>

      {/* Footer note */}
      {selectedPack && (
        <PaymentMethodDialog
          pack={selectedPack}
          onClose={() => setIsOpen(false)}
          isOpen={isOpen}
        />
      )}
    </div>
  );
};
