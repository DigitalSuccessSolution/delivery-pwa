"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Phone, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { INITIAL_NOTIFICATIONS } from "@/data/mockData";

export default function MobileHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const [notifications] = useState(INITIAL_NOTIFICATIONS);
  const unreadCount = notifications.length;

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [avatar, setAvatar] = useState("/delivery_boy_hero.png");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkAuth = () => {
        const saved = localStorage.getItem("moncradel_rider_logged_in");
        setIsLoggedIn(saved === "true");

        // Load profile data
        const savedUser = localStorage.getItem("moncradel_rider_user");
        if (savedUser) {
          try {
            const parsed = JSON.parse(savedUser);
            if (parsed.avatar) setAvatar(parsed.avatar);
          } catch(e) {}
        }
      };
      
      checkAuth();
      window.addEventListener("moncradel-login", checkAuth);
      window.addEventListener("moncradel-logout", checkAuth);
      window.addEventListener("storage", checkAuth);
      
      return () => {
        window.removeEventListener("moncradel-login", checkAuth);
        window.removeEventListener("moncradel-logout", checkAuth);
        window.removeEventListener("storage", checkAuth);
      };
    }
  }, []);

  if (!isLoggedIn) return null;
  if (pathname === "/account" || pathname === "/profile") return null;

  const isMainTabRoute = ["/", "/orders", "/map", "/earnings", "/profile", "/notifications", "/support"].includes(pathname);

  const getSubpageTitle = (path: string) => {
    if (path.startsWith("/profile/edit")) return "Edit Profile";
    if (path.startsWith("/orders/")) return "Order Details";
    return "Partner Portal";
  };

  // INNER SUBPAGE HEADER: Back Arrow + Page Title (Only visible on mobile md:hidden)
  if (!isMainTabRoute) {
    return (
      <header className="md:hidden sticky top-0 z-30 bg-white border-b border-slate-200/80 px-4 py-3.5 transition-all shadow-xs w-full">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1E4E70] transition-colors cursor-pointer active:scale-95 flex items-center justify-center"
              title="Go Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-semibold text-slate-900 text-base tracking-tight truncate max-w-[200px]">
              {getSubpageTitle(pathname)}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert("Connecting to Support...")}
              className="flex items-center justify-center bg-[#FFD1DC]/30 text-[#1E4E70] hover:bg-[#FFD1DC]/60 px-3 py-1.5 rounded-xl border border-[#FFD1DC] transition-colors shadow-xs"
            >
              <Phone className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>
    );
  }

  // MAIN TAB HEADER (Mobile)
  return (
    <header className="md:hidden sticky top-0 z-30 bg-[#F8F9FA]/90 backdrop-blur-md border-b border-slate-200/60 px-4 py-3 transition-all w-full">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Rider Avatar & Status */}
        <div className="flex items-center gap-3">
          <Link href="/account" className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm ring-2 ring-[#A5D8FF] bg-slate-100">
              <Image
                src={avatar}
                alt="Rider"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#B2F2BB] border-2 border-white rounded-full"></span>
          </Link>
          <div>
            <h2 className="font-semibold text-[#1E4E70] text-sm leading-tight">
              Active Shift
            </h2>
            <p className="text-[11px] font-medium text-emerald-600">
              ● Online
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("Connecting to Dispatch...")}
            className="flex items-center justify-center bg-rose-50 text-rose-600 w-9 h-9 rounded-full border border-rose-100 transition-colors"
          >
            <Phone className="w-4 h-4" />
          </button>

          <Link
            href="/notifications"
            className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors flex items-center justify-center"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
