"use client";

import { useState, useEffect } from "react";
import {
  BellRing,
  MapPin,
  Building2,
  PackageCheck,
  Navigation,
  CheckCircle2,
  XCircle,
  Sparkles,
  Baby,
  Clock
} from "lucide-react";

interface IncomingOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: (order: any) => void;
}

export default function IncomingOrderModal({ isOpen, onClose, onAccept }: IncomingOrderModalProps) {
  const [timeLeft, setTimeLeft] = useState(28);

  useEffect(() => {
    if (!isOpen) return;
    setTimeLeft(28);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const mockIncomingOrder = {
    id: "ORD-9804",
    patientName: "Aarav Mehta (4-Month Infant)",
    parentName: "Priya Mehta (Parent)",
    parentPhone: "+91 98765-43210",
    pickupName: "Moncradel Central Pharmacy & OPD Store",
    pickupAddress: "Block B, Floor 1, City Health Hub, Gate #2",
    deliveryAddress: "Flat 402, Sunset Heights, Bandra West, Mumbai",
    distance: "2.8 km",
    estTime: "12 mins",
    payout: "₹145.00",
    items: [
      { name: "Lactose-Free Infant Formula", qty: "1 Box (400g)", category: "Diet Kit" },
      { name: "WHO Baby Iron & Vitamin Drops", qty: "1 Bottle (15ml)", category: "Medicine" },
      { name: "Organic Carrot & Apple Puree", qty: "4 Jars", category: "Nutrition" },
    ],
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white w-full max-w-sm rounded-[32px] p-5 shadow-2xl border border-slate-200 space-y-4 animate-slideUp text-slate-800">
        
        {/* Animated Banner Header */}
        <div className="bg-[#1E4E70] rounded-2xl p-3.5 text-white flex items-center justify-between shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center animate-bounce-subtle shrink-0">
              <BellRing className="w-5 h-5 text-[#A5D8FF] animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#A5D8FF] block">
                🚨 URGENT BABY CARE ORDER
              </span>
              <h3 className="font-semibold text-sm leading-tight text-white">
                New Order Available!
              </h3>
            </div>
          </div>
          <div className="text-right relative z-10">
            <span className="text-xs font-mono font-semibold bg-black/30 px-2 py-1 rounded-lg border border-white/20 text-white">
              00:{timeLeft.toString().padStart(2, "0")}s
            </span>
          </div>
        </div>

        {/* Payout & Distance Bar */}
        <div className="flex items-center justify-between bg-[#A5D8FF]/20 p-3 rounded-2xl border border-[#A5D8FF]/40">
          <div>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
              ESTIMATED EARNING
            </span>
            <span className="text-lg font-semibold text-[#1E4E70] leading-none">
              {mockIncomingOrder.payout}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
              DISTANCE / ETA
            </span>
            <span className="text-xs font-semibold text-slate-800">
              {mockIncomingOrder.distance} • {mockIncomingOrder.estTime}
            </span>
          </div>
        </div>

        {/* Route Details: Pickup & Delivery */}
        <div className="space-y-3 relative pl-4 border-l-2 border-dashed border-slate-300 my-1">
          {/* Pickup Point */}
          <div className="relative">
            <div className="absolute -left-[23px] top-0.5 w-4 h-4 rounded-full bg-[#1E4E70] border-2 border-white ring-2 ring-[#1E4E70]/30 flex items-center justify-center">
              <Building2 className="w-2.5 h-2.5 text-white" />
            </div>
            <span className="text-[10px] font-semibold text-[#1E4E70] uppercase tracking-wider block">
              PICKUP STORE
            </span>
            <h4 className="font-semibold text-slate-900 text-xs leading-tight">
              {mockIncomingOrder.pickupName}
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5 font-normal">
              {mockIncomingOrder.pickupAddress}
            </p>
          </div>

          {/* Delivery Point */}
          <div className="relative pt-1">
            <div className="absolute -left-[23px] top-1.5 w-4 h-4 rounded-full bg-[#FFD1DC] border-2 border-white ring-2 ring-[#FFD1DC]/80 flex items-center justify-center">
              <MapPin className="w-2.5 h-2.5 text-[#1E4E70]" />
            </div>
            <span className="text-[10px] font-semibold text-[#1E4E70] uppercase tracking-wider block">
              DELIVER TO PARENT
            </span>
            <h4 className="font-semibold text-slate-900 text-xs leading-tight">
              {mockIncomingOrder.parentName}
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5 font-normal">
              {mockIncomingOrder.deliveryAddress}
            </p>
          </div>
        </div>

        {/* Package Items Preview */}
        <div className="bg-[#F8FAFC] rounded-2xl p-3 border border-slate-200/60 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700">
            <span className="flex items-center gap-1">
              <Baby className="w-3.5 h-3.5 text-[#1E4E70]" />
              <span>Patient: {mockIncomingOrder.patientName}</span>
            </span>
            <span className="text-slate-400 font-normal">3 Items</span>
          </div>
          <div className="divide-y divide-slate-200/50">
            {mockIncomingOrder.items.map((item, i) => (
              <div key={i} className="py-1 flex items-center justify-between text-xs">
                <span className="font-medium text-slate-800 truncate">{item.name}</span>
                <span className="text-[10px] font-semibold text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200 shrink-0">
                  {item.qty}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={onClose}
            className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs py-3 rounded-2xl transition-colors cursor-pointer flex items-center justify-center gap-1 active:scale-95"
          >
            <XCircle className="w-4 h-4 text-slate-500" />
            <span>Decline</span>
          </button>
          <button
            onClick={() => onAccept(mockIncomingOrder)}
            className="w-2/3 bg-[#1E4E70] hover:bg-[#153852] text-white font-semibold text-xs py-3 rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 border border-[#1E4E70]"
          >
            <CheckCircle2 className="w-4 h-4 text-[#B2F2BB]" />
            <span>ACCEPT ORDER ({mockIncomingOrder.payout})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
