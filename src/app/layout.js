import { Michroma } from "next/font/google";
import "./globals.css";
import { Web3ModalProvider } from "@/context/Web3Modal";

const michroma = Michroma({ 
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={michroma.className}>
        <Web3ModalProvider>{children}</Web3ModalProvider>
      </body>
    </html>
  );
}
