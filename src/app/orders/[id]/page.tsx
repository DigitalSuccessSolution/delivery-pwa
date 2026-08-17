"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { 
  PhoneCall, 
  MapPin, 
  Navigation,
  ShieldCheck,
  AlertCircle,
  Camera,
  CheckCircle2,
  Package,
  Map as MapIcon,
  MessageSquare
} from "lucide-react";

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [photoCaptured, setPhotoCaptured] = useState(false);

  const orderId = resolvedParams.id.toUpperCase().replace("-", "");
  const mockOrder = {
    orderNumber: `#${orderId}`,
    status: "out_for_delivery",
    parentName: "Sarah Henderson",
    babyName: "Baby Leo (8M)",
    phone: "+1 555-0198",
    kitchenAddress: "Moncradel Kitchen #K-402, Bay 1",
    address: "402 Sunset Blvd, Block B, Apartment 4B",
    city: "San Francisco, CA",
    specialInstructions: "Please do not ring the doorbell, the baby is sleeping. Leave the thermal box near the shoe rack.",
    itemSummary: "Iron-Rich Spinach Rice Mash",
    packCount: 4,
    distanceKm: 2.3
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleCompleteDelivery = () => {
    if (otp.join("").length < 4) {
      alert("Please enter the 4-digit OTP provided by the customer.");
      return;
    }
    if (!photoCaptured) {
      alert("Please capture a photo as proof of delivery.");
      return;
    }
    alert(`Success! Order ${mockOrder.orderNumber} marked as Delivered.`);
    router.push("/orders");
  };

  return (
    <div className="w-full font-sans animate-fade-in-up pb-20">
      
      {/* 1. TOP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <h1 className="text-3xl font-medium text-slate-900 tracking-tight">
              Order {mockOrder.orderNumber}
            </h1>
            <span className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-[13px] font-medium px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Out for Delivery
            </span>
          </div>
          <p className="text-[15px] text-slate-500 font-medium">Delivery to {mockOrder.parentName}</p>
        </div>
        
        <div className="flex gap-2 self-start sm:self-auto">
          <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[14px] font-medium px-4 py-2.5 rounded-lg transition-all border border-transparent">
             <MessageSquare className="w-4 h-4" /> Chat
          </button>
          <button className="flex items-center gap-2 bg-[#A5D8FF]/20 hover:bg-[#A5D8FF]/30 border border-[#A5D8FF]/50 text-[#1E4E70] text-[14px] font-medium px-4 py-2.5 rounded-lg transition-all">
             <PhoneCall className="w-4 h-4" /> Call Customer
          </button>
        </div>
      </div>

      {/* 2. SPECIAL INSTRUCTIONS ALERT */}
      {mockOrder.specialInstructions && (
        <div className="bg-amber-50/80 rounded-lg p-5 border border-amber-200/50 flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0 border border-amber-200/50">
            <AlertCircle className="w-6 h-6 text-amber-600" />
          </div>
          <div className="pt-0.5">
            <h3 className="text-[15px] font-medium text-amber-900">Critical Delivery Note</h3>
            <p className="text-[14.5px] text-amber-800/80 mt-1 leading-relaxed max-w-3xl">
              "{mockOrder.specialInstructions}"
            </p>
          </div>
        </div>
      )}

      {/* 3. SPLIT LAYOUT FOR MAIN CONTENT */}
      {/* grid items-start ensures that the left and right columns align at the top perfectly without stretching */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* LEFT COLUMN: INFORMATION */}
        <div className="space-y-6">
          
          {/* Locations Timeline Card */}
          <div className="bg-white rounded-lg border border-slate-200/80 p-6 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
              <MapIcon className="w-48 h-48" />
            </div>
            
            <h2 className="text-[14px] font-medium text-slate-500 uppercase tracking-wider mb-5 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Route Details
            </h2>
            
            {/* Pickup Node */}
            <div className="flex items-start gap-4 mb-1">
              <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center shrink-0 border border-orange-100 z-10">
                <span className="text-[14px] font-bold text-orange-600">K</span>
              </div>
              <div className="flex-1 pb-6 relative">
                <div className="absolute left-[-2.25rem] top-10 bottom-0 w-0.5 bg-slate-200 border-l-[2px] border-dashed border-slate-300"></div>
                <p className="text-[13px] text-slate-500 mb-0.5">Pickup from Kitchen</p>
                <p className="text-[15px] font-medium text-slate-900 leading-tight">{mockOrder.kitchenAddress}</p>
                <button className="mt-3 w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 text-[13px] font-medium px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 border border-slate-200/50">
                  <Navigation className="w-3.5 h-3.5" /> Navigate to Hub
                </button>
              </div>
            </div>

            {/* Drop Node */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center shrink-0 border border-emerald-100 z-10">
                <MapPin className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="flex-1">
                <p className="text-[13px] text-slate-500 mb-0.5">Drop to Customer</p>
                <p className="text-[16px] font-medium text-slate-900 leading-tight">{mockOrder.address}</p>
                <p className="text-[14px] text-slate-500 mt-1">{mockOrder.city} • {mockOrder.distanceKm} km away</p>
                <button className="mt-3 w-full sm:w-auto bg-slate-900 hover:bg-black text-white text-[13px] font-medium px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm">
                  <Navigation className="w-3.5 h-3.5" /> Navigate to Drop
                </button>
              </div>
            </div>
          </div>

          {/* Package Details Card */}
          <div className="bg-white rounded-lg border border-slate-200/80 p-6">
            <h2 className="text-[14px] font-medium text-slate-500 uppercase tracking-wider mb-5 flex items-center gap-2">
              <Package className="w-4 h-4" /> Package Contents
            </h2>
            
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center">
                  <span className="text-2xl">🥣</span>
                </div>
                <div>
                  <h3 className="text-[15px] font-medium text-slate-900">{mockOrder.itemSummary}</h3>
                  <p className="text-[13px] text-slate-500">For {mockOrder.babyName}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="block text-[18px] font-medium text-slate-900">{mockOrder.packCount}</span>
                <span className="text-[12px] text-slate-500">Items inside</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ACTION/VERIFICATION */}
        {/* sticky top-24 makes it float on scroll, but alignment matches the left column at the top */}
        <div className="bg-white rounded-lg border border-slate-200/80 p-6 lg:p-8 sticky top-24">
          
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h2 className="text-[20px] font-medium text-slate-900">Verify & Complete</h2>
            <p className="text-[14px] text-slate-500 mt-1">Complete these steps to finish delivery</p>
          </div>
          
          <div className="space-y-8">
            
            {/* STEP 1: OTP */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-[12px] font-medium flex items-center justify-center">1</span>
                <label className="text-[15px] font-medium text-slate-900">Customer OTP</label>
              </div>
              <div className="flex gap-3 justify-between pl-8">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="number"
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    className="w-full aspect-square bg-slate-50 border border-slate-200 rounded-lg text-center text-2xl font-medium text-slate-900 focus:outline-none focus:border-[#1E4E70] focus:ring-1 focus:ring-[#1E4E70]/50 transition-all"
                    placeholder="-"
                  />
                ))}
              </div>
            </div>

            {/* STEP 2: PHOTO */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-[12px] font-medium flex items-center justify-center">2</span>
                <label className="text-[15px] font-medium text-slate-900">Photo Proof</label>
              </div>
              <div className="pl-8">
                {!photoCaptured ? (
                  <button 
                    onClick={() => setPhotoCaptured(true)}
                    className="w-full py-6 bg-slate-50 hover:bg-slate-100 border-2 border-slate-200 border-dashed text-slate-600 rounded-lg transition-all flex flex-col items-center justify-center gap-3 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Camera className="w-5 h-5 text-slate-500" />
                    </div>
                    <span className="text-[14px] font-medium">Tap to open camera</span>
                  </button>
                ) : (
                  <div className="w-full py-6 bg-emerald-50 border-2 border-emerald-200 text-emerald-700 rounded-lg flex flex-col items-center justify-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white border border-emerald-200 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    </div>
                    <span className="text-[14px] font-medium">Photo securely captured</span>
                  </div>
                )}
              </div>
            </div>

            {/* SUBMIT */}
            <div className="pt-6 border-t border-slate-100">
              <button
                onClick={handleCompleteDelivery}
                className="w-full bg-[#1E4E70] hover:bg-[#153852] text-white font-medium text-[16px] py-4 rounded-lg transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <ShieldCheck className="w-5 h-5 text-[#A5D8FF]" />
                Mark as Delivered
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
