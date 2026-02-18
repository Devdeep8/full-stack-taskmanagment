import { Poppins } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { Toaster } from "react-hot-toast";
import Header from "@/components/header";
import ReduxProvider from "@/store/provider/ReduxProvider";
import CategoriesTab from "@/components/home/components/categories";
import BannerCarousel from "@/components/home/components/banner-carasual";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased   `}>
        <ReduxProvider
          preloadedState={{
            userTask: {
              user: [],
              isAuthenticated: false,
              games: [],
            },
          }}
        >
          <div className=" bg-[url(https://wbgame.daracasino.com/Festival/valentine/bg-pattern.webp)] mx-2 ">
            {/* <AuthFetcher /> */}
            <Header />
            <div className="pt-20   ">
              <BannerCarousel />
            </div>
              <div className=" sticky top-16 z-10">
                <CategoriesTab />
              </div>

            {children}
            {/* {categories} */}
            <Toaster
              position="top-center"
              reverseOrder={false}
              gutter={8}
              containerClassName=""
              containerStyle={{}}
              toasterId="default"
              toastOptions={{
                // Define default options
                className: "",
                duration: 5000,
                removeDelay: 1000,
                style: {
                  background: "#fff",
                  color: "#000",
                },

                // Default options for specific types
                success: {
                  duration: 3000,
                },
              }}
            />
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
