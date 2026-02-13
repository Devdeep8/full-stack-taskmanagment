import { useState } from "react";
import LoginModal from "./components/login-model";
import Link from "next/link";
import ProfileDropDown from "./components/profile";
import SignupModal from "./components/signup-model";
import { useSelector } from "react-redux";

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const handleLogout = () => {
    console.log("done logout")
  }

  const { user, isAuthenticated } = useSelector((state) => state.userTask);
  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-primary">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center  font-bold shadow-lg group-hover:shadow-indigo-500/30 transition-shadow">
              TF
            </div>
            <span className="text-xl font-bold bg-clip-text bg-linear-to-r">
              TaskFlow
            </span>
          </Link>

          <div>
            {isAuthenticated ? (
              <ProfileDropDown user={user} onLogout={handleLogout} />
            ) : (
              <div className="flex gap-4">
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-purple  transition-colors"
                >
                  Login
                </button>

                <button
                  onClick={() => setIsSignupOpen(true)}
                  className="px-4 py-2 text-sm font-medium bg-purple-2  rounded-lg transition-colors shadow-sm"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Separate Modals */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
      />
    </>
  );
};

export default Header;
