import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import NextTopLoader from "nextjs-toploader";
import AiChatDialog from "@/components/shared/ai-chat/AiChatDialog";
import { Bot } from "lucide-react";
import { AiChatProvider } from "@/contexts/AiChatContext";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "ScanDx",
  description:
    "Revolutionize your health journey with AI-powered diagnostics. From skin and eyes to brain scans and lab results, our smart platform delivers instant medical insights—anytime, anywhere.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`relative antialiased w-screen h-screen overflow-x-hidden overflow-y-auto`}
      >
        <AiChatProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader
              color="#2b7fff"
              initialPosition={0.08}
              height={3}
              crawl={true}
              easing="ease"
              speed={200}
              shadow="0 0 10px #2b7fff,0 0 5px #2b7fff"
              zIndex={1600}
              showSpinner={false}
            />
            {children}

            <AiChatDialog>
              <button className="right-3 lg:right-5 bottom-3 lg:bottom-5 fixed flex justify-center items-center bg-primary hover:opacity-90 rounded-full w-14 h-14 text-white text-4xl transition-all duration-200 cursor-pointer">
                <Bot />
              </button>
            </AiChatDialog>
          </ThemeProvider>
        </AiChatProvider>
      </body>
    </html>
  );
}
