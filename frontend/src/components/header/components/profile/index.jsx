/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";
import { GoldCoinIcon, SweepCoinIcon } from "@/common/components/offer-card";
import { formatCoins } from "@/utils";

const ProfileDropDown = ({ user, onLogout }) => {
  const router = useRouter();

  const getInitials = (name = "") =>
    name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const initials = getInitials(user?.name);
  const wallet = user?.wallet ?? {
    goldCoinBalance: 0,
    sweepCoinBalance: 0,
    redeemableSweepCoinBalance: 0,
  };

  return (
    <div className="flex items-center gap-3">
      {/* Name + Email */}
      <div className="flex-col items-end hidden sm:flex">
        <span className="text-sm font-medium text-foreground ">
          {user.name}
        </span>
        <span className="text-xs text-primary-white ">{user.email}</span>
      </div>

      {/* Avatar + Dropdown */}
      <div className="relative group cursor-pointer">
        {/* Avatar button */}
        <button className="flex items-center gap-2 focus:outline-none cursor-pointer">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-9 h-9 rounded-full border border-primary object-cover"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-sm font-semibold border border-primary-light text-foreground ">
              {initials || "U"}
            </div>
          )}
        </button>

        {/* Dropdown */}
        <div className="absolute right-0 mt-2 w-56 bg-block rounded-lg shadow-xl border border-primary/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top-right z-50">
          <div className="p-2 flex flex-col gap-1">
            {/* Wallet section */}
            <div className="px-2 pt-1 pb-2">
              <p className="text-[10px] font-bold tracking-[2px] text-primary-white/50 uppercase mb-2 ">
                My Wallet
              </p>

              {/* Gold Coins */}
              <div className="flex items-center justify-between py-1.5 px-2 rounded-md bg-primary/20 mb-1">
                <div className="flex items-center gap-1.5">
                  <GoldCoinIcon />
                  <span className="text-xs text-primary-white ">
                    Gold Coins
                  </span>
                </div>
                <span className="text-xs font-bold text-gc ">
                  {formatCoins(wallet.goldCoinBalance)}
                </span>
              </div>

              {/* Sweep Coins */}
              <div className="flex items-center justify-between py-1.5 px-2 rounded-md bg-primary/20 mb-1">
                <div className="flex items-center gap-1.5">
                  <SweepCoinIcon />
                  <span className="text-xs text-primary-white ">
                    Sweep Coins
                  </span>
                </div>
                <span className="text-xs font-bold text-sc ">
                  {parseFloat(wallet.sweepCoinBalance).toFixed(2)}
                </span>
              </div>

              {/* RSC */}

              {/* Buy coins CTA */}
              <button
                onClick={() => router.push("/store")}
                className="w-full mt-2 py-1.5 rounded-md bg-secondary/10 border border-secondary/30 text-secondary text-xs font-bold tracking-wide hover:bg-secondary/20 transition-colors "
              >
                + Buy Coins
              </button>
            </div>

            {/* Divider */}
            <div className="h-px bg-primary/30" />

            {/* Go to Profile */}
            <button
              onClick={() => router.push(`/profile/${user.username}`)}
              className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-primary/30 rounded-md transition-colors "
            >
              Go to Profile
            </button>

            {/* Divider */}
            <div className="h-px bg-primary/30" />

            {/* Sign Out */}
            <button
              onClick={onLogout}
              className="w-full text-left px-3 py-2 text-sm text-alert hover:bg-primary/30 rounded-md transition-colors "
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropDown;
