/* eslint-disable @next/next/no-img-element */
const ProfileDropDown = ({ user, onLogout }) => {
  const getInitials = (name = "") => {
    return name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const initials = getInitials(user?.name);

  return (
    <div className="flex items-center gap-3">
      <div className="flex-col items-end hidden sm:flex">
        <span className="text-sm font-medium">
          {user.name}
        </span>
        <span className="text-xs  ">
          {user.email}
        </span>
      </div>

      <div className="relative group">
        <button className="flex items-center gap-2 focus:outline-none">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-9 h-9 rounded-full border  object-cover"
            />
          ) : (
            <div className="w-9 h-9 rounded-full  flex items-center justify-center  text-sm font-semibold border ">
              {initials || "U"}
            </div>
          )}
        </button>

        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 rounded-xl shadow-lg border  opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right">
          <div className="p-1">
            <button
              onClick={onLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg transition-colors"
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
