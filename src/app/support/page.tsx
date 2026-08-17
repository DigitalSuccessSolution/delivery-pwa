"use client";

import { useState } from "react";
import {
  Headphones,
  PhoneCall,
  MessageSquare,
  Clock,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";

export default function SupportPage() {
  const [callbackRequested, setCallbackRequested] = useState(false);

  const handleRequestCallback = () => {
    setCallbackRequested(true);
    setTimeout(() => setCallbackRequested(false), 4000);
  };

  return (
    <div className="space-y-6 pb-20 max-w-2xl mx-auto lg:max-w-4xl lg:mx-0 font-sans animate-fadeIn">
      
      {/* Toll Free Helpline Card */}
      <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100/50 text-slate-800 rounded-2xl p-5 border border-purple-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <PhoneCall className="w-5 h-5 text-purple-700 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-purple-800">
            24x7 Priority Partner Hotline
          </span>
        </div>
        <a
          href="tel:+9118004029900"
          className="text-2xl font-bold tracking-tight block text-purple-950 hover:underline"
        >
          +91 1800-402-9900
        </a>
        <p className="text-xs text-slate-600 font-normal">
          Immediate phone assistance for doorstep parent location issues or thermal container replacements.
        </p>
      </div>

      {/* Support Actions */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
        <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
          Instant Support Options
        </h3>

        <div className="space-y-3">
          <button
            onClick={() => alert("Connecting to Moncradel Live WhatsApp Support Agent...")}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all active:scale-95"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp Support Desk</span>
          </button>

          {callbackRequested ? (
            <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl border border-emerald-200 text-center text-xs font-semibold flex items-center justify-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Callback request logged! Dispatcher calling you shortly.</span>
            </div>
          ) : (
            <button
              onClick={handleRequestCallback}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer border border-slate-200 transition-all active:scale-95"
            >
              <PhoneCall className="w-4 h-4 text-[#1E4E70]" />
              <span>Request Priority Dispatcher Call-Back</span>
            </button>
          )}
        </div>
      </div>

      {/* Common Emergency Protocols */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-3">
        <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span>Emergency Assistance Checklist</span>
        </h3>

        <div className="space-y-2.5 text-xs text-slate-600 font-normal leading-relaxed">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
            <span className="font-semibold text-slate-900 block">Thermal Box Temp Alert (Above 38.0°C)</span>
            <p>Pull over safely and notify dispatch hotline immediately to issue fresh meal dispatch.</p>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
            <span className="font-semibold text-slate-900 block">Customer Unreachable at Doorstep</span>
            <p>Wait 5 minutes, attempt 2 calls via masked number, then log unreachability in delivery bay.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
