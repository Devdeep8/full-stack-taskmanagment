import { useState } from "react";
import LoginModal from "./components/login-model";
import Link from "next/link";
import ProfileDropDown from "./components/profile";
import SignupModal from "./components/signup-model";
import { useSelector } from "react-redux";
import { IMAGEOBJ } from "../../../public/assets";
import Image from "next/image";
import { MenuIcon } from "lucide-react";

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const { logo } = IMAGEOBJ;

  const { user, isAuthenticated } = useSelector((state) => state.userTask);
  const handleLogout = () => {};
  
  return (
    <>
      <header className="fixed top-0 w-full box-border flex items-center bg-[hsl(240_42%_27%/0.8)] bg-[url('https://wbgame.daracasino.com/Festival/valentine/bg-header-deco.webp')] bg-bottom-left bg-cover shadow-[0_0_5px_0_hsl(220_74%_9.2%/0.5)] text-white text-[18px] tracking-[1px] z-50">
        <div className="flex items-center w-full justify-between px-[19.0469px]">
          <div className="flex justify-center items-center py-4">
            <MenuIcon className="cursor-pointer" width={30} height={30} />
            <div>
              <Link href="/" className="flex items-center gap-2 group ml-4">
                <Image
                  src={logo}
                  alt="logo"
                  width={120}
                  height={30}
                  className="object-contain"
                />
              </Link>
            </div>
          </div>
          <div className="center"></div>
          <div>
            {isAuthenticated ? (
              <ProfileDropDown user={user} onLogout={handleLogout} />
            ) : (
              <div className="flex gap-4">
                <button
                  onClick={() => setIsSignupOpen(true)}
                  className="border border-stress-2 bg-background px-6 py-2 max-w-full text-lg shadow-[0_0_10px_rgba(52,255,42,.78)] hover:bg-stress-2 font-bold rounded-md"
                >
                  SIGN IN
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
    </>
  );
};

export default Header;