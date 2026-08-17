"use client";

import { useState } from "react";
import {
  Wallet,
  Clock,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Download,
  IndianRupee
} from "lucide-react";
import { INITIAL_EARNINGS, EarningItem } from "@/data/mockData";

export default function EarningsPage() {
  const [earnings] = useState<EarningItem[]>(INITIAL_EARNINGS);

  // Calculate Balances
  const totalEarnings = earnings.reduce((sum, item) => sum + item.amount, 0);
  const pendingBalance = earnings
    .filter((e) => e.status === "pending")
    .reduce((sum, item) => sum + item.amount, 0);
  const paidBalance = earnings
    .filter((e) => e.status === "paid")
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6 animate-fade-in-up pb-16 max-w-3xl mx-auto lg:max-w-none lg:mx-0 font-sans w-full">
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-medium text-slate-900 tracking-tight mb-1">
            My Earnings
          </h1>
          <p className="text-base text-slate-500 font-medium hidden md:block">
            Track your order payouts and wallet balance.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: WALLET BALANCE & WITHDRAWAL */}
        <div className="lg:col-span-1 space-y-6">
          {/* Master Wallet Card */}
          <div className="bg-[#1E4E70] rounded-3xl p-6 shadow-lg shadow-[#1E4E70]/20 text-white relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />

            <div className="relative z-10">
              <span className="text-[12px] font-medium text-[#A5D8FF] uppercase tracking-wider block mb-1">
                Total Earnings
              </span>
              <div className="flex items-center gap-1.5 mb-6">
                <IndianRupee className="w-7 h-7 text-white" />
                <h2 className="text-4xl font-semibold tracking-tight">
                  {totalEarnings.toFixed(2)}
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-5 border-t border-white/10">
                <div>
                  <span className="text-[11px] text-[#A5D8FF] font-medium flex items-center gap-1 mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    Pending
                  </span>
                  <span className="text-lg font-semibold text-white">
                    ₹{pendingBalance.toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-[#A5D8FF] font-medium flex items-center gap-1 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Settled
                  </span>
                  <span className="text-lg font-semibold text-white">
                    ₹{paidBalance.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Instant UPI Withdrawal Widget */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center font-bold shrink-0">
                <Wallet className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 text-[15px]">
                  Instant UPI Payout
                </h3>
                <p className="text-[13px] text-slate-500 font-medium">
                  Linked: vikram@okaxis
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/60 flex items-center justify-between">
              <span className="text-[13px] text-slate-600 font-medium">
                Withdrawable
              </span>
              <span className="font-bold text-slate-900 text-[15px]">
                ₹{pendingBalance.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() =>
                alert(
                  `₹${pendingBalance.toFixed(2)} Instant Transfer Initiated! 🎉`
                )
              }
              disabled={pendingBalance <= 0}
              className={`w-full font-medium text-[14px] py-3.5 rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95 ${
                pendingBalance > 0
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              <span>Transfer to UPI Now</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMNS: RECENT EARNINGS LIST */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-2">
            <h2 className="font-semibold text-slate-900 text-lg tracking-tight">
              Recent Earnings
            </h2>
            <button
              onClick={() => alert("Downloading Statement CSV...")}
              className="text-[13px] font-medium text-[#1E4E70] bg-[#1E4E70]/5 hover:bg-[#1E4E70]/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Statement</span>
            </button>
          </div>

          <div className="grid gap-3">
            {earnings.map((earning) => (
              <div
                key={earning.id}
                className="bg-white rounded-lg border border-slate-200/80 p-4 hover:border-slate-300 transition-colors flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-brand text-[16px]">
                      {earning.orderNumber}
                    </span>
                  </div>
                  <div className="text-[16px] font-bold text-slate-900">
                    +₹{earning.amount.toFixed(2)}
                  </div>
                </div>

                <div className="flex items-start justify-between gap-4 pt-1">
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <p className="text-[14px] text-slate-600 font-medium truncate">
                      {earning.notes}
                    </p>
                    <p className="text-[14px] text-slate-500">
                      {earning.createdAt}
                    </p>
                  </div>

                  <div className="shrink-0 mt-1">
                    {earning.status === "paid" ? (
                      <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-md">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        SETTLED
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-amber-700 bg-amber-50 border border-amber-200/60 px-2.5 py-1 rounded-md">
                        <Clock className="w-3.5 h-3.5" />
                        PENDING
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {earnings.length === 0 && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-10 flex flex-col items-center justify-center text-center">
                <Wallet className="w-12 h-12 text-slate-300 mb-3" />
                <h3 className="text-[16px] font-medium text-slate-800">
                  No earnings yet
                </h3>
                <p className="text-[14px] text-slate-500 mt-1">
                  Complete orders to start earning.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
