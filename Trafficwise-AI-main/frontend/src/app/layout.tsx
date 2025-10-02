import "./globals.css";
import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
import FloatingChat from "@/components/FloatingChat";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/ThemeProvider";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TrafficWise AI - Smart Traffic Management",
  description:
    "AI-powered traffic management and urban planning for Pakistani cities",
  keywords: "traffic, Pakistan, AI, urban planning, Karachi, Lahore, Islamabad",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          storageKey="traffic-wise-theme"
        >
          <div className="relative flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <FloatingChat />
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: "",
              style: {
                borderRadius: "10px",
                background: "hsl(var(--background))",
                color: "hsl(var(--foreground))",
                border: "1px solid hsl(var(--border))",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}