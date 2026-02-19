const OfferCard = ({
  name,
  goldCoins,
  sweepCoins,
  price,
  originalPrice = null,
  tag = null,
  onBuy,
}) => {
  const handleBuy = () => onBuy?.({ name, goldCoins, sweepCoins, price });

  return (
    <div className="relative flex flex-col gap-3 w-52 bg-gray-900 border border-white/10 rounded-2xl p-5 hover:border-yellow-400/40 hover:-translate-y-1 hover:shadow-2xl transition-all duration-200 cursor-default">

      <OfferCardBadge tag={tag} />

      <h3 className="text-white font-bold text-base tracking-wide m-0 pr-16">{name}</h3>

      <hr className="border-white/10 m-0" />

      <OfferCardCoins goldCoins={goldCoins} sweepCoins={sweepCoins} />

      <hr className="border-white/10 m-0" />

      <OfferCardFooter price={price} originalPrice={originalPrice} onBuy={handleBuy} />

    </div>
  );
};

export default OfferCard;






const OfferCardFooter = ({ price, originalPrice = null, onBuy }) => {
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;

  return (
    <div className="flex items-end justify-between">

      {/* Price */}
      <div className="flex flex-col">
        {originalPrice && (
          <span className="text-[11px] text-white/30 line-through">
            ${originalPrice.toFixed(2)}
          </span>
        )}
        <div className="flex items-center gap-1.5">
          <span className="text-white font-extrabold text-xl">${price.toFixed(2)}</span>
          {discount && (
            <span className="text-[10px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded">
              -{discount}%
            </span>
          )}
        </div>
      </div>

      {/* Buy Now button */}
      <button
        onClick={onBuy}
        className="bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-black font-extrabold text-sm px-4 py-2 rounded-xl transition-all duration-150 cursor-pointer"
      >
        Buy Now
      </button>

    </div>
  );
};

export const GoldCoinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#ffd52e" stroke="#ffd52e" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="7" fill="#ffd52e" stroke="#ffd52e" strokeWidth="0.5" />
    <text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ffd52e">G</text>
  </svg>
);

export const SweepCoinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#66e600" stroke="#66e600" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="7" fill="#66e600" stroke="#66e600" strokeWidth="0.5" />
    <text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#EDE9FE">SC</text>
  </svg>
);

const OfferCardCoins = ({ goldCoins, sweepCoins }) => {
  const formatCoins = (n) => (n >= 1000 ? `${(n / 1000).toFixed(0)}K` : `${n}`);

  return (
    <div className="flex flex-col gap-2">

      {/* Gold Coins row */}
      <div className="flex items-center gap-2">
        <GoldCoinIcon />
        <span className="text-yellow-400 font-bold text-sm">{formatCoins(goldCoins)}</span>
        <span className="text-white/50 text-sm">Gold Coins</span>
      </div>

      {/* Sweep Coins row */}
      <div className="flex items-center gap-2">
        <SweepCoinIcon />
        <span className="text-violet-400 font-bold text-sm">{sweepCoins}</span>
        <span className="text-white/50 text-sm">Free Sweep Coins</span>
      </div>

      {/* RSC note — pack purchase gives SC only, RSC comes from winning */}
      <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg px-2 py-1.5 text-[11px] text-white/40">
        🏆 Win games with Sweep Coins to earn <strong className="text-violet-400">RSC</strong>
      </div>

    </div>
  );
};


const TAG_STYLES = {
  "BEST VALUE": "bg-amber-400 text-black",
  "POPULAR":    "bg-emerald-500 text-white",
  "HOT":        "bg-red-500 text-white",
  "NEW":        "bg-blue-500 text-white",
};
const OfferCardBadge = ({ tag }) => {
  if (!tag) return null;

  return (
    <span
      className={`absolute top-3 right-3 text-[9px] font-extrabold tracking-widest px-2 py-1 rounded-full ${TAG_STYLES[tag] ?? "bg-gray-500 text-white"}`}
    >
      {tag}
    </span>
  );
};

