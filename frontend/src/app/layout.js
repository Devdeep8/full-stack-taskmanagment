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

// ✅ SEO Metadata
export const metadata = {
  title: {
    default: "Dara Casino | Play Online Casino Games",
    template: "%s | Dara Casino",
  },
  description:
    "Welcome to Dara Casino – your ultimate destination for online casino games, slots, live games, and big wins. Play now and experience the thrill!",
  keywords: [
    "dara casino",
    "online casino",
    "casino games",
    "slots",
    "live casino",
    "betting",
    "gambling",
  ],
  authors: [{ name: "Dara Casino" }],
  metadataBase: new URL("https://wbgame.daracasino.com"), // ✅ required for OG images
  openGraph: {
    title: "Dara Casino | Play Online Casino Games",
    description:
      "Play the best online casino games at Dara Casino. Slots, live games, tournaments and more!",
    url: "https://wbgame.daracasino.com",
    siteName: "Dara Casino",
    images: [
      {
        url: "/og-image.png", // add a 1200x630 image in your /public folder
        width: 1200,
        height: 630,
        alt: "Dara Casino",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dara Casino | Play Online Casino Games",
    description: "Play the best online casino games at Dara Casino!",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <ReduxProvider
          preloadedState={{
            userTask: {
              user: [],
              isAuthenticated: false,
              games: [],
            },
          }}
        >
          <div className="bg-[url(https://wbgame.daracasino.com/Festival/valentine/bg-pattern.webp)] mx-2">
            <Header />
            <div className="pt-20">
              <BannerCarousel />
            </div>
            <div className="sticky top-16 z-10">
              <CategoriesTab />
            </div>
            {children}
            <Toaster
              position="top-center"
              reverseOrder={false}
              gutter={8}
              toasterId="default"
              toastOptions={{
                className: "",
                duration: 5000,
                removeDelay: 1000,
                style: {
                  background: "#fff",
                  color: "#000",
                },
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
