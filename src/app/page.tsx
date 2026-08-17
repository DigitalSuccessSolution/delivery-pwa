"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ClipboardList,
  CheckCircle2,
  Banknote,
  Phone,
  ShoppingBag,
  ChevronRight,
  MapPin,
  ShieldCheck,
  Bike,
  Star,
  Check,
  Clock,
  Bell,
  Headphones,
  Compass,
  LogOut
} from "lucide-react";
import IncomingOrderModal from "@/components/features/IncomingOrderModal";

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [userPhone, setUserPhone] = useState("");
  const [isOnline, setIsOnline] = useState(true);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [activeStep, setActiveStep] = useState<"pickup" | "verify_pickup" | "in_transit" | "delivered">("in_transit");
  const [currentOrder, setCurrentOrder] = useState<any>({
    id: "9201",
    patientName: "Aarav Mehta (4 Months)",
    parentName: "Priya Mehta",
    parentPhone: "+91 98765-43210",
    address: "Sunset Blvd, 402",
    fullAddress: "Flat 402, Sunset Heights, Bandra West, Mumbai",
    distance: "2.4km",
    items: '"Organic Puree" x 4 packs',
    payout: "₹145.00",
  });

  // Handle mobile screen detection
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check persistent login state & listen for global custom events
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("moncradel_rider_logged_in");
      if (saved === "true") {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }

      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      checkMobile();
      window.addEventListener("resize", checkMobile);

      const handleLogoutEvent = () => {
        setIsLoggedIn(false);
      };

      const handleLoginEvent = () => {
        setIsLoggedIn(true);
      };

      window.addEventListener("moncradel-logout", handleLogoutEvent);
      window.addEventListener("moncradel-login", handleLoginEvent);

      return () => {
        window.removeEventListener("resize", checkMobile);
        window.removeEventListener("moncradel-logout", handleLogoutEvent);
        window.removeEventListener("moncradel-login", handleLoginEvent);
      };
    }
  }, []);

  const handleCompleteLogin = (phone?: string) => {
    if (phone) setUserPhone(phone);
    setIsLoggedIn(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("moncradel_rider_logged_in", "true");
      window.dispatchEvent(new Event("moncradel-login"));
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("moncradel_rider_logged_in", "false");
      window.dispatchEvent(new Event("moncradel-logout"));
    }
  };

  const handleOpenDeliveryModal = () => {
    window.dispatchEvent(new CustomEvent("open-delivery-modal"));
  };

  const handleAcceptNewOrder = (newOrder: any) => {
    setCurrentOrder(newOrder);
    setActiveStep("pickup");
    setShowOrderModal(false);
  };

  if (!isLoggedIn) {
    if (!isMounted) return null;

    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 text-center">
        <h1 className="text-2xl font-bold text-[#1E4E70] mb-2">Moncradel Delivery</h1>
        <p className="text-slate-500 mb-8">Partner App</p>
        <button
          onClick={() => handleCompleteLogin("9876543210")}
          className="bg-[#1E4E70] hover:bg-[#153852] text-white px-8 py-3 rounded-xl font-semibold shadow-md transition-all active:scale-95"
        >
          Login to Partner Portal
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24 p-2 sm:p-4 font-sans text-[#1E4E70] animate-fadeIn max-w-2xl mx-auto lg:max-w-none lg:mx-0">
      
      {/* 1. TOP HEADER & SHIFT CONTROLS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">
            Hello, Vikram
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            Ready for your afternoon pediatric deliveries?
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Online / Offline Pill Switch */}
          <div className="bg-slate-200/60 p-1 rounded-full flex items-center w-48">
            <button
              onClick={() => setIsOnline(true)}
              className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                isOnline
                  ? "bg-[#1E4E70] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              • Online
            </button>
            <button
              onClick={() => setIsOnline(false)}
              className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                !isOnline
                  ? "bg-slate-700 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Offline
            </button>
          </div>

          {/* Simulate Incoming Order Trigger */}
          {isOnline && (
            <button
              onClick={() => setShowOrderModal(true)}
              className="hidden sm:flex bg-[#1E4E70] hover:bg-[#153852] text-white font-semibold text-xs py-2.5 px-4 rounded-2xl shadow-xs items-center gap-2 transition-all cursor-pointer active:scale-98 whitespace-nowrap"
            >
              <Bike className="w-4 h-4 text-[#B2F2BB]" />
              <span>Simulate Order</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Simulate Order Trigger Button */}
      {isOnline && (
        <button
          onClick={() => setShowOrderModal(true)}
          className="sm:hidden w-full bg-[#1E4E70] hover:bg-[#153852] text-white font-semibold text-xs py-3 rounded-2xl shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
        >
          <Bike className="w-4 h-4 text-[#B2F2BB]" />
          <span>⚡ Simulate Incoming Baby Order Request</span>
        </button>
      )}


      {/* 2. PERFORMANCE METRICS CARDS (3-COLUMNS RESPONSIVE GRID) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 lg:gap-5">
        {/* Card 1: Assigned Today */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 block">
              Assigned Today
            </span>
            <p className="text-2xl font-semibold text-slate-900 leading-none">
              12
            </p>
            <span className="text-xs text-slate-400 font-normal block">
              Tasks scheduled
            </span>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-[#A5D8FF]/30 text-[#1E4E70] border border-[#A5D8FF]/60 flex items-center justify-center shrink-0">
            <ClipboardList className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Completed */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-2.5 flex-1 pr-4">
            <span className="text-xs font-semibold text-slate-400 block">
              Completed
            </span>
            <p className="text-2xl font-semibold text-slate-900 leading-none">
              8
            </p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[66%] rounded-full" />
              </div>
              <span className="text-xs font-semibold text-slate-600">66%</span>
            </div>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-[#B2F2BB]/40 text-[#1E4E70] border border-[#B2F2BB] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
        </div>

        {/* Card 3: Earnings */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 block">
              Earnings Today
            </span>
            <p className="text-2xl font-semibold text-slate-900 leading-none">
              ₹1,450.00
            </p>
            <span className="text-xs font-semibold text-rose-500 block">
              +₹140.00 since 1PM
            </span>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-[#FFD1DC]/40 text-[#1E4E70] border border-[#FFD1DC] flex items-center justify-center shrink-0">
            <Banknote className="w-6 h-6 text-rose-600" />
          </div>
        </div>
      </div>


      {/* 3. MAIN DASHBOARD CONTENT SPLIT (2-COLUMNS DESKTOP GRID) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT 2 COLUMNS: CURRENT ACTIVE ORDER & MAP */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">
              Current Active Order & Live Route
            </h2>
            <Link
              href="/orders"
              className="text-xs font-semibold text-[#1E4E70] hover:underline flex items-center gap-0.5"
            >
              <span>View All Orders</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
            {/* Map Preview Stage */}
            <div className="relative rounded-2xl overflow-hidden h-48 lg:h-64 border border-slate-200 shadow-inner">
              <Image
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800"
                alt="Live route map preview"
                fill
                className="object-cover"
              />
              {/* Center Compass Marker */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-11 h-11 rounded-full bg-[#1E4E70]/90 backdrop-blur-md text-white flex items-center justify-center shadow-lg border-2 border-white">
                  <Compass className="w-5 h-5 text-[#A5D8FF] animate-spin-slow" />
                </div>
              </div>
            </div>

            {/* Status Badge & Remaining Distance Row */}
            <div className="flex items-center justify-between pt-1">
              <span className="bg-[#A5D8FF]/30 text-[#1E4E70] font-semibold text-xs px-3 py-1 rounded-full border border-[#A5D8FF]/60 uppercase tracking-wider">
                IN TRANSIT
              </span>

              <div className="text-right">
                <span className="text-base font-semibold text-slate-900 block leading-tight">
                  {currentOrder.distance}
                </span>
                <span className="text-[10px] text-slate-400 font-normal">
                  Remaining Distance
                </span>
              </div>
            </div>

            {/* Order Title & Address */}
            <div className="space-y-0.5">
              <h3 className="text-lg font-semibold text-slate-900">
                Order #{currentOrder.id}
              </h3>
              <p className="text-xs text-slate-500 font-normal">
                Delivery to: <strong className="text-slate-800 font-semibold">{currentOrder.address}</strong>
              </p>
            </div>

            {/* Item Details Inner Light Card */}
            <div className="bg-[#F8F9FA] p-3.5 rounded-2xl border border-slate-200/70 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white text-[#1E4E70] border border-slate-200 flex items-center justify-center shrink-0 shadow-xs">
                <ShoppingBag className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  ITEM DETAILS
                </span>
                <p className="text-xs font-semibold text-slate-800">
                  {currentOrder.items}
                </p>
              </div>
            </div>

            {/* Action Row: Start Delivery / Verify OTP + Phone Button */}
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={handleOpenDeliveryModal}
                className="flex-1 bg-[#1E4E70] hover:bg-[#153852] text-white font-semibold text-xs py-3.5 rounded-2xl shadow-sm transition-all cursor-pointer active:scale-98 text-center"
              >
                Start Delivery • Verify OTP
              </button>

              <a
                href={`tel:${currentOrder.parentPhone}`}
                className="w-12 h-12 rounded-2xl border border-slate-200 hover:bg-slate-50 text-[#1E4E70] flex items-center justify-center shrink-0 transition-colors shadow-xs"
                title="Call Customer"
              >
                <Phone className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT 1 COLUMN: QUICK ACTIONS & HUB PORTAL */}
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-slate-900">
            Quick Actions & Kitchen Hub
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {/* Card 1: Pickup Orders */}
            <Link
              href="/orders"
              className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center space-y-3 hover:border-slate-300 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#A5D8FF]/30 text-[#1E4E70] border border-[#A5D8FF]/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <span className="font-semibold text-slate-900 text-xs">
                View Orders
              </span>
            </Link>

            {/* Card 2: Support */}
            <Link
              href="/support"
              className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center space-y-3 hover:border-slate-300 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#B2F2BB]/40 text-[#1E4E70] border border-[#B2F2BB] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Headphones className="w-6 h-6 text-emerald-700" />
              </div>
              <span className="font-semibold text-slate-900 text-xs">
                Support Desk
              </span>
            </Link>
          </div>

          {/* Kitchen Hub Insulation Status Card */}
          <div className="bg-gradient-to-br from-[#A5D8FF]/20 via-sky-50 to-blue-50/60 p-5 rounded-3xl border border-[#A5D8FF]/60 shadow-xs space-y-3 text-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E4E70]">
                Moncradel Kitchen #K-402
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
                36.5°C Sealed ✓
              </span>
            </div>
            <h3 className="font-semibold text-sm text-[#1E4E70]">
              Pediatric Thermal Insulation Protocol Active
            </h3>
            <p className="text-xs text-slate-600 font-normal leading-relaxed">
              All diet containers pre-heated/chilled at kitchen bays. Keep thermal bag zipped during express transit.
            </p>
          </div>
        </div>

      </div>

      {/* Incoming Delivery Request Modal */}
      <IncomingOrderModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        onAccept={handleAcceptNewOrder}
      />
    </div>
  );
}
