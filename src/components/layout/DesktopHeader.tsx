"use client";

import Link from "next/link";
import Image from "next/image";
import { Bell, Phone, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { INITIAL_NOTIFICATIONS } from "@/data/mockData";

export default function DesktopHeader() {
  const [notifications] = useState(INITIAL_NOTIFICATIONS);
  const unreadCount = notifications.length;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullName, setFullName] = useState("Rider");
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
            if (parsed.name) {
              setFullName(parsed.name);
            }
            if (parsed.avatar) setAvatar(parsed.avatar);
          } catch(e) {}
        }
      };
      
      checkAuth();
      window.addEventListener("moncradel-login", checkAuth);
      window.addEventListener("moncradel-logout", checkAuth);
      
      // Also listen to storage events to update header when profile is edited in another tab/component
      window.addEventListener("storage", checkAuth);
      
      return () => {
        window.removeEventListener("moncradel-login", checkAuth);
        window.removeEventListener("moncradel-logout", checkAuth);
        window.removeEventListener("storage", checkAuth);
      };
    }
  }, []);

  if (!isLoggedIn) return null;

  return (
    <header className="hidden md:flex sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/60 px-6 lg:px-8 py-3.5 transition-all w-full items-center justify-between">
      {/* Left: Global Search or Context */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search orders, areas, or customers..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-[14px] font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#A5D8FF]/50 transition-all"
          />
        </div>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => alert("Connecting to Moncradel Dispatch Support...")}
          className="flex items-center gap-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 font-medium text-[13px] px-3 py-2 rounded-xl border border-rose-200 transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span>Dispatch SOS</span>
        </button>

        <Link
          href="/notifications"
          className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors flex items-center justify-center"
          title="View Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></span>
          )}
        </Link>

        <Link href="/profile" className="flex items-center gap-3 hover:bg-slate-50 p-1.5 rounded-xl transition-colors pr-3">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 bg-slate-100">
            <Image
              src={avatar}
              alt="Rider"
              width={36}
              height={36}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="hidden lg:block">
            <p className="text-[13px] font-medium text-slate-900 leading-none">{fullName}</p>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">● Online</p>
          </div>
        </Link>
      </div>
    </header>
  );
}
