"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Package,
  Truck,
  Banknote,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  ChevronRight,
  Flame,
  X,
  HeartPulse
} from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  text: string;
  time: string;
  type: "order" | "pickup" | "earnings" | "system";
  isRead: boolean;
  actionLink?: string;
  actionText?: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n-1",
    title: "New Delivery Assigned",
    text: "Order #ORD-9921 for Sarah J. & Baby Leo. Priority pickup slot: 10:30 AM at Bay 1.",
    time: "5 min ago",
    type: "order",
    isRead: false,
    actionLink: "/orders",
    actionText: "View Order Task"
  },
  {
    id: "n-2",
    title: "Kitchen Thermal Box Ready",
    text: "36.5°C thermal diet box for Order #9201 sealed at Moncradel Kitchen #K-402, Bay 3.",
    time: "20 min ago",
    type: "pickup",
    isRead: false,
    actionLink: "/orders",
    actionText: "View Order"
  },
  {
    id: "n-3",
    title: "Weekly Incentive Bonus Credited",
    text: "You earned a ₹1,500.00 bonus for completing 25 peak express deliveries this week.",
    time: "2 hours ago",
    type: "earnings",
    isRead: false,
    actionLink: "/earnings",
    actionText: "View Wallet Payout"
  },
  {
    id: "n-4",
    title: "Thermal Gear Replacement Reminder",
    text: "Free replacement delivery bags are ready for pickup at Moncradel Central Hub.",
    time: "Yesterday",
    type: "system",
    isRead: true,
    actionLink: "/profile",
    actionText: "Check Gear Status"
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState<"all" | "order" | "pickup" | "earnings" | "system">("all");
  const [showPushBanner, setShowPushBanner] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === "all") return true;
    return n.type === activeFilter;
  });

  const handleTriggerPushBanner = () => {
    setShowPushBanner(true);
    setTimeout(() => setShowPushBanner(false), 7000);
  };

  const getTypeIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "order":
        return <Package className="w-4 h-4 text-[#1E4E70]" />;
      case "pickup":
        return <Flame className="w-4 h-4 text-emerald-700" />;
      case "earnings":
        return <Banknote className="w-4 h-4 text-amber-700" />;
      case "system":
        return <ShieldCheck className="w-4 h-4 text-purple-700" />;
    }
  };

  return (
    <div className="space-y-5 pb-16 font-sans max-w-2xl mx-auto lg:max-w-none lg:mx-0 animate-fadeIn relative">
      
      {/* iPhone Dynamic Island Floating Push Banner - Light Blue Theme */}
      {showPushBanner && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-[9999] w-[92%] max-w-[380px] bg-[#F0F8FF]/95 text-slate-900 backdrop-blur-2xl p-4 rounded-[28px] shadow-xl border border-[#A5D8FF] ring-1 ring-slate-900/5 animate-iosFloat space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#1E4E70] text-white flex items-center justify-center font-bold shadow-xs">
                <HeartPulse className="w-3.5 h-3.5 text-[#A5D8FF]" />
              </div>
              <span className="text-[11px] font-bold text-[#1E4E70] tracking-wider uppercase">
                MONCRADEL
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 font-medium">Just Now</span>
              <button
                onClick={() => setShowPushBanner(false)}
                className="p-1 rounded-full hover:bg-slate-200/60 text-slate-400 hover:text-slate-700 cursor-pointer transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="space-y-1 px-1">
            <h4 className="font-bold text-xs text-slate-900">
              New Express Order #ORD-9935
            </h4>
            <p className="text-[11px] text-slate-600 font-normal leading-relaxed">
              Priya Mehta & Baby Aarav • 2.4 km • ₹165.00 Payout
            </p>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Link
              href="/orders"
              onClick={() => setShowPushBanner(false)}
              className="flex-1 bg-[#1E4E70] hover:bg-[#153852] text-white font-semibold text-xs py-2.5 rounded-xl text-center shadow-xs transition-all flex items-center justify-center gap-1 active:scale-95 cursor-pointer"
            >
              <span>Accept & View Task</span>
              <ChevronRight className="w-4 h-4 text-[#A5D8FF]" />
            </Link>
            <button
              onClick={() => setShowPushBanner(false)}
              className="bg-white hover:bg-slate-100 text-slate-600 font-medium text-xs py-2.5 px-4 rounded-xl border border-slate-200 transition-all cursor-pointer shadow-2xs"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Action Bar with Filter Tabs & Preview Banner Trigger */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { key: "all", label: `All (${notifications.length})` },
            { key: "order", label: "Orders" },
            { key: "pickup", label: "Pickups" },
            { key: "earnings", label: "Payouts" },
            { key: "system", label: "System" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === tab.key
                  ? "bg-[#1E4E70] text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200/60 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleTriggerPushBanner}
          className="text-xs font-medium text-[#1E4E70] bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-all cursor-pointer border border-slate-200 shrink-0 whitespace-nowrap"
        >
          Preview Banner
        </button>
      </div>

      {/* Single Unified Clean List Container (Flat layout, NO redundant nested boxes) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                setNotifications((prev) =>
                  prev.map((n) => (n.id === item.id ? { ...n, isRead: true } : n))
                )
              }
              className={`p-4 transition-colors cursor-pointer flex items-start gap-3 hover:bg-slate-50 ${
                !item.isRead ? "bg-slate-50/70" : ""
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                {getTypeIcon(item.type)}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900 text-xs">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    {item.time}
                  </span>
                </div>

                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  {item.text}
                </p>

                {item.actionLink && (
                  <div className="pt-0.5">
                    <Link
                      href={item.actionLink}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1E4E70] hover:underline"
                    >
                      <span>{item.actionText}</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-xs text-slate-400 font-normal">
            No alerts found.
          </div>
        )}
      </div>

    </div>
  );
}
