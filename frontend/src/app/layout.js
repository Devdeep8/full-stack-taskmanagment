"use client";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { Provider } from "react-redux";
import store from "@/store";
import AuthFetcher from "@/common/hooks/authFeatcher";
import { Toaster } from "react-hot-toast";
import BannerCarousel from "@/components/home/components/banner-carasual";
import CategoriesTab from "@/components/home/components/categories";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased   `}>
        <div className=" bg-[url(https://wbgame.daracasino.com/Festival/valentine/bg-pattern.webp)] ">
        <Provider store={store} >
          <AuthFetcher />
          <div className="pt-20  bg-[url(https://wbgame.daracasino.com/Festival/valentine/bg-pattern.webp)] ">
          

          <Header />
          </div>
          <BannerCarousel />
          <div className="sticky top-16 z-50 ">
            <CategoriesTab />
          </div>
          {children}
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
        </Provider>
            </div>
      </body>
    </html>
  );
}
