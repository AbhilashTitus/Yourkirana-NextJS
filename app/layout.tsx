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

const IS_MAINTENANCE_MODE = false;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (IS_MAINTENANCE_MODE) {
    return (
      <html lang="en">
        <body className={lexend.className} suppressHydrationWarning>
          <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-lg w-full text-center space-y-6 p-10 bg-white rounded-[2rem] shadow-xl border border-gray-100">
              <div className="flex flex-col items-center justify-center">
                <div className="relative mb-8 mt-4">
                  <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-75"></div>
                  <div className="relative bg-blue-50 p-5 rounded-full shadow-sm border border-blue-100 flex items-center justify-center">
                    <svg 
                      xmlns="http://www.w3.org/http://www.w3.org/2000/svg" 
                      className="w-12 h-12 text-blue-600 animate-[spin_4s_linear_infinite]" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>

                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">
                  Site Under Maintenance
                </h1>
                
                <p className="text-gray-500 text-lg leading-relaxed mb-8 px-4">
                  We're currently upgrading our platform to serve you better. 
                  Don't worry, we'll be back online shortly!
                </p>

                <div className="flex items-center justify-center space-x-3 mb-8">
                  <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-3 h-3 bg-blue-600/80 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-3 h-3 bg-blue-600/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>

                <div className="pt-8 border-t border-gray-100 w-full mt-2">
                  <p className="text-sm font-medium text-gray-400">
                    &copy; {new Date().getFullYear()} YourKirana. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={lexend.className} suppressHydrationWarning>
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
