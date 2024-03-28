import { Inter } from "next/font/google";
import type { Metadata } from "next";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { SolanaProvider } from "@/providers/solana-provider";
import { TRPCReactProvider } from "@/trpc/react";

import "@/styles/globals.css";
import { Layout } from "@/components/layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "BlockTalk",
  description: "Talk to the Solana blockchain using AI",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <SolanaProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <Layout>{children}</Layout>

              <Toaster />
            </ThemeProvider>
          </SolanaProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
