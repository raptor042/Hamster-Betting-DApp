import { Press_Start_2P } from "next/font/google";
import "./globals.css";
import { Web3ModalProvider } from "@/context/Web3Modal";
import { StateProvider } from "@/store";

const ps2 = Press_Start_2P({
  subsets: ["latin"],
  weight: "400"
});

export const metadata = {
  title: "Hamster Betting",
  description: "Place your bets on any of your favorite hamsters.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any"/>
      </head>
      <body className={ps2.className}>
        <StateProvider>
          <Web3ModalProvider>{children}</Web3ModalProvider>
        </StateProvider>
      </body>
    </html>
  );
}
