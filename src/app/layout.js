"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PromoBanner from "../components/banner";
import { getCurrentUser } from "@/lib/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function AuthHandler({ setUser, setAuthChanged }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    getCurrentUser()
      .then((res) => setUser(res))
      .catch(() => setUser(null));
  }, [setAuthChanged]);

  useEffect(() => {
    const shouldRefresh = searchParams.get("authRefreshed");
    if (shouldRefresh === "true") {
      setAuthChanged((prev) => !prev);
      router.replace(pathname);
    }
  }, [searchParams, pathname, router, setAuthChanged]);

  return null;
}

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);
  const [authChanged, setAuthChanged] = useState(false);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    getCurrentUser()
      .then((res) => setUser(res))
      .catch(() => setUser(null))
      .finally(() => setIsUserLoaded(true));
  }, [authChanged]);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <PromoBanner />
        <Suspense>
          <AuthHandler setUser={setUser} setAuthChanged={setAuthChanged} />
        </Suspense>
        {isUserLoaded && (
          <Navbar
            user={user}
            refreshAuth={() => setAuthChanged((prev) => !prev)}
          />
        )}
        <div>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
