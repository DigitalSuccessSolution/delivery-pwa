"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Package,
  Banknote,
  User,
  Navigation as NavIcon,
} from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkAuth = () => {
        const saved = localStorage.getItem("moncradel_rider_logged_in");
        setIsLoggedIn(saved === "true");
      };
      checkAuth();
      window.addEventListener("moncradel-login", checkAuth);
      window.addEventListener("moncradel-logout", checkAuth);
      return () => {
        window.removeEventListener("moncradel-login", checkAuth);
        window.removeEventListener("moncradel-logout", checkAuth);
      };
    }
  }, []);

  if (!isLoggedIn) return null;

  // Mobile Bottom Navigation — 5 main tabs
  const mobileNavItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Orders", href: "/orders", icon: Package },
    { name: "Map", href: "/map", icon: NavIcon },
    { name: "Earnings", href: "/earnings", icon: Banknote },
    { name: "Profile", href: "/profile", icon: User },
  ];

  // Only show bottom nav on main 5 tab routes
  const isMainTabRoute = ["/", "/orders", "/map", "/earnings", "/profile"].includes(pathname);

  if (!isMainTabRoute) {
    return null;
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] w-full">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 group py-1 px-3"
            >
              <div
                className={`w-12 h-8 rounded-full flex items-center justify-center transition-all ${
                  isActive
                    ? "bg-[#1E4E70] text-white shadow-sm scale-105"
                    : "text-slate-500 group-hover:text-slate-900"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "stroke-[2]" : "stroke-[1.6]"}`} />
              </div>
              <span
                className={`text-[11px] transition-colors ${
                  isActive ? "text-[#1E4E70] font-semibold" : "text-slate-500 font-medium"
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
