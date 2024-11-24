import "@rainbow-me/rainbowkit/styles.css";
import type { Metadata } from "next";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "TokenVerse - Portfolio",
  description: "Manage your token portfolio",
};

export default function WalletLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Providers>{children}</Providers>;
}