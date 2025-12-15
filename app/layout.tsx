import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/context/ToastContext";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "YourKirana",
  description: "Delivering essentials from local stores to your doorstep.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lexend.className}>
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <ScrollToTop />
              <Header />
              {children}
              <Footer />
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
