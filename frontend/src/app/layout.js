"use client";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { Provider } from "react-redux";
import store from "@/store";
import AuthFetcher from "@/common/hooks/authFeatcher";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "500", "700", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <Provider store={store}>
          <AuthFetcher />

          <Header />
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
      </body>
    </html>
  );
}
