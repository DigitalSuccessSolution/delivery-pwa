"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ClipboardList,
  CheckCircle2,
  Banknote,
  Navigation,
  Headphones,
  Bike,
  Wallet,
  ChevronRight,
  Loader2
} from "lucide-react";

export default function Dashboard() {
  const [isOnline, setIsOnline] = useState(true);
  const [riderName, setRiderName] = useState("Rider");

  // Dashboard Stats State
  const [isLoading, setIsLoading] = useState(true);
  const [earnings, setEarnings] = useState(0);
  const [assignedOrders, setAssignedOrders] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("moncradel_rider_user");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          setRiderName(user.name?.split(' ')[0] || "Rider");
        } catch (e) {}
      }
    }
  }, []);

  const fetchDashboardData = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("moncradel_rider_token");
      if (!token) return;

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

      // Fetch Earnings
      const earningRes = await fetch(`${API_URL}/earnings?staffRole=delivery`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const earningData = await earningRes.json();
      if (earningData.success) {
        // Find today's earnings specifically
        const today = new Date().toDateString();
        const todaysEarnings = (earningData.data || []).filter((e: any) => 
          new Date(e.createdAt).toDateString() === today
        ).reduce((acc: number, curr: any) => acc + curr.amount, 0);
        
        setEarnings(todaysEarnings);
      }

      // Fetch Orders (Assigned & Delivered)
      const orderRes = await fetch(`${API_URL}/orders`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const orderData = await orderRes.json();
      if (orderData.success) {
        const orders = orderData.data || [];
        setAssignedOrders(orders.filter((o: any) => o.status !== 'delivered').length);
        setDeliveredOrders(orders.filter((o: any) => o.status === 'delivered').length);
      }

    } catch (err) {
      console.error("Failed to fetch dashboard stats", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return (
    <div className="space-y-6 pb-16 font-sans text-slate-800 animate-fade-in-up max-w-5xl mx-auto w-full">
      
      {/* 1. TOP HEADER & ONLINE STATUS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 bg-white p-5 rounded-xl border border-slate-100 group transition-all">
        <div>
          <h1 className="text-[22px] sm:text-2xl font-semibold text-slate-900 tracking-tight">
            Hello, {riderName}
          </h1>
          <p className="text-[13px] sm:text-[14px] text-slate-500 font-medium mt-0.5">
            Drive safely and deliver smiles.
          </p>
        </div>

        {/* Online / Offline Switch */}
        <div className="bg-slate-100/80 p-1.5 rounded-full flex items-center w-full sm:w-56 border border-slate-200/50">
          <button
            onClick={() => setIsOnline(true)}
            className={`flex-1 py-2 px-3 rounded-full text-[13px] font-semibold transition-all flex items-center justify-center gap-1.5 ${
              isOnline
                ? "bg-[#1E4E70] text-white"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {isOnline && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
            Online
          </button>
          <button
            onClick={() => setIsOnline(false)}
            className={`flex-1 py-2 px-3 rounded-full text-[13px] font-semibold transition-all flex items-center justify-center gap-1.5 ${
              !isOnline
                ? "bg-slate-700 text-white"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Offline
          </button>
        </div>
      </div>

      {/* 2. STATS OVERVIEW */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-5">
        
        {/* Earnings Card */}
        <div className="col-span-2 sm:col-span-1 bg-blue-100/70 rounded-xl p-5 relative overflow-hidden flex flex-col justify-center min-h-[110px] transition-colors">
          <div className="relative z-10">
            <span className="text-[13px] text-blue-900/70 font-semibold tracking-wide block mb-1">
              Today's Earnings
            </span>
            <h2 className="text-[28px] font-semibold text-blue-950 tracking-tight leading-none flex items-center gap-2">
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin text-blue-600/50" /> : `₹${earnings.toFixed(2)}`}
            </h2>
          </div>
          <Banknote className="absolute right-4 bottom-4 w-12 h-12 text-blue-500/20" />
        </div>

        {/* Deliveries Card */}
        <div className="col-span-1 bg-emerald-100/60 rounded-xl p-4 sm:p-5 flex flex-col justify-center min-h-[110px] relative overflow-hidden">
          <span className="text-[13px] text-emerald-900/70 font-semibold flex items-center gap-1.5 mb-2 relative z-10">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Delivered
          </span>
          <span className="text-[24px] font-semibold text-emerald-950 leading-none relative z-10 flex items-center gap-2">
             {isLoading ? <Loader2 className="w-5 h-5 animate-spin text-emerald-600/50" /> : deliveredOrders}
          </span>
          <CheckCircle2 className="absolute right-4 bottom-4 w-12 h-12 text-emerald-500/10" />
        </div>

        {/* Assigned Card */}
        <div className="col-span-1 bg-orange-100/60 rounded-xl p-4 sm:p-5 flex flex-col justify-center min-h-[110px] relative overflow-hidden">
          <span className="text-[13px] text-orange-900/70 font-semibold flex items-center gap-1.5 mb-2 relative z-10">
            <ClipboardList className="w-4 h-4 text-orange-500" />
            Assigned
          </span>
          <span className="text-[24px] font-semibold text-orange-950 leading-none relative z-10 flex items-center gap-2">
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin text-orange-600/50" /> : assignedOrders}
          </span>
          <ClipboardList className="absolute right-4 bottom-4 w-12 h-12 text-orange-500/10" />
        </div>

      </div>

      {/* 3. QUICK ACTIONS GRID */}
      <div>
        <h2 className="text-[15px] font-semibold text-slate-800 mb-3 px-1">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
          
          <Link
            href="/orders"
            className="bg-white rounded-xl p-5 border border-slate-100 flex items-center justify-between hover:border-[#1E4E70]/30 hover:bg-slate-50/50 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Bike className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-[15px] text-slate-900">Manage Orders</h3>
                <p className="text-[13px] font-medium text-slate-500 mt-0.5">View active and ready tasks</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#1E4E70] transition-colors" />
          </Link>

          <Link
            href="/earnings"
            className="bg-white rounded-xl p-5 border border-slate-100 flex items-center justify-between hover:border-[#1E4E70]/30 hover:bg-slate-50/50 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-[15px] text-slate-900">Earnings & Wallet</h3>
                <p className="text-[13px] font-medium text-slate-500 mt-0.5">Track payouts & transactions</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#1E4E70] transition-colors" />
          </Link>

          <Link
            href="/map"
            className="bg-white rounded-xl p-5 border border-slate-100 flex items-center justify-between hover:border-[#1E4E70]/30 hover:bg-slate-50/50 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <Navigation className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-[15px] text-slate-900">Live Map</h3>
                <p className="text-[13px] font-medium text-slate-500 mt-0.5">Navigate active deliveries</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#1E4E70] transition-colors" />
          </Link>

          <Link
            href="/support"
            className="bg-white rounded-xl p-5 border border-slate-100 flex items-center justify-between hover:border-[#1E4E70]/30 hover:bg-slate-50/50 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-[15px] text-slate-900">Support Desk</h3>
                <p className="text-[13px] font-medium text-slate-500 mt-0.5">Get help or raise a ticket</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#1E4E70] transition-colors" />
          </Link>

        </div>
      </div>
      
    </div>
  );
}
