"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  ShieldCheck,
  CreditCard,
  Camera,
  ChevronRight,
  Headphones,
  LogOut,
  Pencil
} from "lucide-react";

export default function ProfilePage() {
  const [fullName, setFullName] = useState("Rider Vikram Singh");
  const [phone, setPhone] = useState("9876543210");
  const [email, setEmail] = useState("vikram.singh@moncradel.com");

  const [city, setCity] = useState("Mumbai");
  const [vehicleType, setVehicleType] = useState("EV Scooter");
  const [vehicleNumber, setVehicleNumber] = useState("MH-02-EV-9021");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("moncradel_rider_profile");
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          if (parsed.fullName) setFullName(parsed.fullName);
          if (parsed.phone) setPhone(parsed.phone);
          if (parsed.email) setEmail(parsed.email);
          if (parsed.city) setCity(parsed.city);
          if (parsed.vehicleType) setVehicleType(parsed.vehicleType);
          if (parsed.vehicleNumber) setVehicleNumber(parsed.vehicleNumber);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("moncradel_rider_logged_in", "false");
      window.dispatchEvent(new Event("moncradel-logout"));
      window.location.href = "/";
    }
  };

  return (
    <div className="space-y-6 pb-20 max-w-2xl mx-auto lg:max-w-none lg:mx-0 font-sans animate-fadeIn">
      
      {/* Header Title */}
      <div className="flex items-center justify-between pt-1 px-1 gap-2">
        <div>
          <h1 className="text-base sm:text-xl font-semibold text-slate-900 tracking-tight">
            Profile & Account
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            Personal details, vehicle credentials, support & app policies
          </p>
        </div>
        <span className="bg-emerald-50 text-emerald-800 text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200 whitespace-nowrap shrink-0">
          Verified Partner ✓
        </span>
      </div>

      {/* DESKTOP 2-COLUMN GRID SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* LEFT COLUMN: RIDER AVATAR HERO & PORTAL PAGES */}
        <div className="space-y-6">
          
          {/* RIDER AVATAR HEADER CARD */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#1E4E70] relative">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                    alt="Rider Vikram"
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
                <button
                  onClick={() => alert("Photo update trigger active!")}
                  className="absolute bottom-0 right-0 p-1 bg-[#1E4E70] text-white rounded-full border border-white cursor-pointer"
                  title="Change Photo"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="min-w-0 space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <h2 className="text-base sm:text-lg font-semibold text-slate-900 whitespace-nowrap">
                    {fullName}
                  </h2>
                  <ShieldCheck className="w-4 h-4 text-[#1E4E70] shrink-0" />
                </div>
                <p className="text-xs font-medium text-[#1E4E70] whitespace-nowrap">
                  Pediatric Express Specialist • 5.0 ★
                </p>
                <p className="text-[11px] text-slate-500 font-normal whitespace-nowrap">
                  {city} • {vehicleType} ({vehicleNumber})
                </p>
              </div>
            </div>

            {/* EDIT PROFILE BUTTON */}
            <Link
              href="/profile/edit"
              className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-[#1E4E70] bg-[#A5D8FF]/30 hover:bg-[#A5D8FF]/60 px-4 py-2 rounded-xl border border-[#A5D8FF] transition-all cursor-pointer shrink-0 shadow-2xs active:scale-95 whitespace-nowrap self-start sm:self-center"
            >
              <Pencil className="w-3.5 h-3.5 text-[#1E4E70]" />
              <span>Edit Profile</span>
            </Link>
          </div>

          {/* QUICK NAVIGATION PAGES */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-3">
            <h3 className="font-semibold text-slate-900 text-sm tracking-tight px-1">
              Quick Links
            </h3>

            <div className="divide-y divide-slate-100">
              
              <Link
                href="/earnings"
                className="py-3 px-1 flex items-center justify-between hover:bg-slate-50 transition-colors rounded-xl cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-medium text-slate-800 text-xs sm:text-sm block">
                      Earnings & Payouts
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal block">
                      View your earnings and payout history
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/support"
                className="py-3 px-1 flex items-center justify-between hover:bg-slate-50 transition-colors rounded-xl cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Headphones className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-medium text-slate-800 text-xs sm:text-sm block">
                      Contact Support
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal block">
                      Get help with orders, payments & more
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/notifications"
                className="py-3 px-1 flex items-center justify-between hover:bg-slate-50 transition-colors rounded-xl cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#1E4E70] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-medium text-slate-800 text-xs sm:text-sm block">
                      Notifications
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal block">
                      View alerts and order updates
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

            </div>
          </div>

        </div>


        {/* RIGHT COLUMN: LOGOUT */}
        <div className="space-y-6">

          {/* LOGOUT BUTTON */}
          <div>
            <button
              onClick={handleLogout}
              className="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 font-medium text-xs sm:text-sm py-3.5 rounded-xl border border-rose-200 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4 text-rose-600" />
              <span>Sign Out / Switch Partner Account</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
