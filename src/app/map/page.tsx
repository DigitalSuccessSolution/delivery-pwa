"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  Navigation as NavIcon,
  Phone,
  Info,
  Compass,
  Layers,
  MapPin,
  Clock,
  Volume2,
  VolumeX
} from "lucide-react";

// Dynamically load Leaflet interactive map with SSR disabled to prevent React 19 DOM hydration issues
const InteractiveMap = dynamic(() => import("@/components/features/InteractiveMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-screen bg-slate-100 flex items-center justify-center text-slate-400 font-medium text-xs">
      Loading Live Interactive Navigation Map...
    </div>
  ),
});

export default function MapPage() {
  const [navigating, setNavigating] = useState(false);
  const [muted, setMuted] = useState(false);
  const [tileLayerType, setTileLayerType] = useState<"light" | "osm" | "dark">("light");

  const toggleMapStyle = () => {
    setTileLayerType((prev) => (prev === "light" ? "dark" : prev === "dark" ? "osm" : "light"));
  };

  return (
    <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 -my-6 min-h-[calc(100vh-65px)] flex flex-col justify-between overflow-hidden bg-slate-100">
      {/* 1. Dynamic SSR-safe Interactive Leaflet Map */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <InteractiveMap tileLayerType={tileLayerType} />
      </div>

      {/* 2. Top Right Floating Controls */}
      <div className="relative z-20 p-4 flex justify-between items-start">
        {/* Voice Navigation Sound Indicator */}
        <button
          onClick={() => setMuted(!muted)}
          className="bg-white/90 backdrop-blur-md px-3 py-2 rounded-2xl shadow-lg border border-slate-200/80 text-xs font-semibold text-[#1E4E70] flex items-center gap-1.5 cursor-pointer"
        >
          {muted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-[#1E4E70]" />}
          <span>{muted ? "Muted" : "Voice Guidance ON"}</span>
        </button>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => alert("Re-centering map on your live GPS position...")}
            className="w-11 h-11 bg-white rounded-2xl shadow-lg flex items-center justify-center text-[#1E4E70] hover:bg-slate-50 transition-transform active:scale-95 border border-slate-200/80 cursor-pointer"
            title="Re-center on My Location"
          >
            <Compass className="w-5 h-5 text-[#1E4E70]" />
          </button>
          <button
            onClick={toggleMapStyle}
            className="w-11 h-11 bg-white rounded-2xl shadow-lg flex items-center justify-center text-[#1E4E70] hover:bg-slate-50 transition-transform active:scale-95 border border-slate-200/80 cursor-pointer"
            title={`Switch Map Theme (Current: ${tileLayerType.toUpperCase()})`}
          >
            <Layers className="w-5 h-5 text-[#1E4E70]" />
          </button>
        </div>
      </div>

      {/* 3. Bottom Sliding Sheet Overlay Card */}
      <div className="relative z-20 max-w-lg mx-auto w-full p-4 mb-16 lg:mb-4">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 border border-slate-200/80 shadow-2xl space-y-4 animate-slideUp">
          {/* Top handle bar line */}
          <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto"></div>

          {/* Subheader & Phone Button */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-semibold text-[#1E4E70] uppercase tracking-wider block">
                NEXT STOP
              </span>
              <h2 className="text-lg font-semibold text-slate-900 tracking-tight mt-0.5">
                Priya Mehta
              </h2>
            </div>
            {/* Circle Phone Button */}
            <a
              href="tel:+15559876543"
              className="w-11 h-11 rounded-full bg-[#A5D8FF]/30 text-[#1E4E70] border border-[#A5D8FF]/60 flex items-center justify-center shadow-xs hover:bg-[#A5D8FF]/50 transition-colors"
              title="Call Priya Mehta"
            >
              <Phone className="w-5 h-5 fill-current text-[#1E4E70]" />
            </a>
          </div>

          {/* Metadata Pills Row (1.2 km & 8 mins) */}
          <div className="flex items-center gap-2">
            <div className="bg-[#FFD1DC]/40 px-3 py-1.5 rounded-full text-xs font-semibold text-[#1E4E70] border border-[#FFD1DC] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#1E4E70]" />
              <span>1.2 km</span>
            </div>
            <div className="bg-[#A5D8FF]/30 px-3 py-1.5 rounded-full text-xs font-semibold text-[#1E4E70] border border-[#A5D8FF]/60 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#1E4E70]" />
              <span>8 mins</span>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={() => setNavigating(!navigating)}
              className="flex-1 font-semibold text-xs py-3.5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer bg-[#1E4E70] hover:bg-[#153852] text-white border border-[#1E4E70]"
            >
              <NavIcon className="w-4 h-4 text-[#A5D8FF]" />
              <span>{navigating ? "Voice Turn-by-Turn Active" : "Start Navigation"}</span>
            </button>

            <button
              onClick={() => alert("Order Notes for Priya Mehta: Ring bell #402, baby is sleeping.")}
              className="w-12 h-12 bg-[#FFD1DC]/30 hover:bg-[#FFD1DC]/60 text-[#1E4E70] rounded-2xl border border-[#FFD1DC] flex items-center justify-center shrink-0 transition-colors cursor-pointer"
              title="Order Details Info"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
