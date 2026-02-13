"use client"
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { Provider } from "react-redux";
import store from "@/store";
import AuthFetcher from "@/common/hooks/authFeatcher";

const poppins = Poppins({
  subsets: ["latin"],
  weight : ["100" , "500" , "700" , "900" ]
});


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        <Provider store={ store}>
          <AuthFetcher/>

        <Header/>
        {children}
        </Provider>
      </body>
    </html>
  );
}
