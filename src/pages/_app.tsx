import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import { Toaster } from "~/components/ui/toaster";

import "~/styles/globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={inter.className}>
      <Component {...pageProps} />
      <Toaster />
    </div>
  );
};

export default MyApp;
