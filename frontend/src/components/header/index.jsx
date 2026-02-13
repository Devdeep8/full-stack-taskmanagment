import { useState } from "react";
import LoginModal from "./components/login-model";
import Link from "next/link";


const Header = () => {



  const [isLoginOpen, setIsLoginOpen] = useState(false);
//   const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-primary">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold shadow-lg group-hover:shadow-indigo-500/30 transition-shadow">
              TF
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r">
              TaskFlow
            </span>
          </Link>

          <div>
             
              <div className="flex gap-4">
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-purple text-white transition-colors"
                >
                  Login
                </button>

                {/* <button
                  onClick={() => setIsSignupOpen(true)}
                  className="px-4 py-2 text-sm font-medium bg-purple-2 text-white rounded-lg transition-colors shadow-sm"
                >
                  Sign Up
                </button> */}
              </div>
          </div>
        </div>
      </header>

      {/* Separate Modals */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
{/* 
      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
      /> */}
    </>
  );
};

export default Header;
