"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Search,
  PackageCheck,
  Navigation,
  Clock,
  PhoneCall,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  X,
} from "lucide-react";
import { INITIAL_DELIVERY_TASKS, DeliveryTask } from "@/data/mockData";

export default function OrdersPage() {
  const router = useRouter();

  // Fake state for hardcoded data
  const [tasks, setTasks] = useState<DeliveryTask[]>(INITIAL_DELIVERY_TASKS);
  const [activeTab, setActiveTab] = useState<
    "ready" | "out_for_delivery" | "delivered"
  >("ready");
  // Filter based on selected tab
  const filteredTasks = tasks.filter((t) => t.status === activeTab);

  const handlePickup = (id: string) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, status: "out_for_delivery" } : t,
      ),
    );
  };

  const handleCompleteDelivery = (id: string) => {
    router.push(`/orders/${id}`);
  };

  return (
    <div className="space-y-6 animate-fade-in-up pb-16 max-w-2xl mx-auto lg:max-w-none lg:mx-0 font-sans w-full">
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-medium text-slate-900 tracking-tight mb-1">
            Delivery Tasks
          </h1>
          <p className="text-base text-slate-500 font-medium hidden md:block">
            Manage your pickups and active deliveries.
          </p>
        </div>


      </div>

      {/* Tabs Container */}
      <div className="flex items-center gap-2.5 w-full overflow-x-auto no-scrollbar mt-4 pb-1">
        {/* Ready Tab */}
        <button
          onClick={() => setActiveTab("ready")}
          className={`flex-none py-2 px-4 rounded-full text-[14px] font-medium transition-all flex items-center justify-center gap-2 ${
            activeTab === "ready"
              ? "bg-[#1E4E70] text-white border border-[#1E4E70] shadow-md shadow-[#1E4E70]/20"
              : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
          }`}
        >
          Ready at Hub
          <span
            className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
              activeTab === "ready"
                ? "bg-white/20 text-white"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {tasks.filter((t) => t.status === "ready").length}
          </span>
        </button>

        {/* Out for Delivery Tab */}
        <button
          onClick={() => setActiveTab("out_for_delivery")}
          className={`flex-none py-2 px-4 rounded-full text-[14px] font-medium transition-all flex items-center justify-center gap-2 ${
            activeTab === "out_for_delivery"
              ? "bg-[#1E4E70] text-white border border-[#1E4E70] shadow-md shadow-[#1E4E70]/20"
              : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
          }`}
        >
          My Deliveries
          <span
            className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
              activeTab === "out_for_delivery"
                ? "bg-white/20 text-white"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {tasks.filter((t) => t.status === "out_for_delivery").length}
          </span>
        </button>

        {/* Delivered Tab */}
        <button
          onClick={() => setActiveTab("delivered")}
          className={`flex-none py-2 px-4 rounded-full text-[14px] font-medium transition-all flex items-center justify-center gap-2 ${
            activeTab === "delivered"
              ? "bg-[#1E4E70] text-white border border-[#1E4E70] shadow-md shadow-[#1E4E70]/20"
              : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
          }`}
        >
          Completed
          <span
            className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
              activeTab === "delivered"
                ? "bg-white/20 text-white"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {tasks.filter((t) => t.status === "delivered").length}
          </span>
        </button>
      </div>

      {/* 3. ORDER CARDS LIST */}
      <div
        className={
          filteredTasks.length === 0
            ? "mt-4"
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6"
        }
      >
        {filteredTasks.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-10 flex flex-col items-center justify-center text-center">
            <PackageCheck className="w-12 h-12 text-slate-300 mb-3" />
            <h3 className="text-[16px] font-medium text-slate-800">
              No orders found
            </h3>
            <p className="text-[14px] text-slate-500 mt-1">
              {activeTab === "ready"
                ? "There are no ready orders at the hub right now."
                : activeTab === "out_for_delivery"
                  ? "You don't have any active deliveries."
                  : "No completed deliveries yet."}
            </p>
          </div>
        ) : (
          filteredTasks.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg border border-slate-200/80 p-4 space-y-4 hover:border-slate-300 transition-colors"
            >
              {/* Header: Order ID & Distance */}
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-brand text-[16px]">
                    {order.orderNumber}
                  </span>
                </div>
                <span className="text-[14px] font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                  {order.distanceKm} km away
                </span>
              </div>

              {/* Body: Customer & Address */}
              <div className="flex gap-4">
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div>
                    <p className="text-[16px] font-semibold text-slate-900 truncate">
                      {order.parentName}
                    </p>
                  </div>

                  <div className="pt-2 space-y-3">
                    <div className="flex items-start gap-3 text-[14px] text-slate-600">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5 shrink-0 ring-4 ring-emerald-50"></div>
                      <span className="leading-snug flex-1">
                        <span className="font-medium text-slate-700">
                          Pickup:{" "}
                        </span>
                        {order.kitchenAddress}
                      </span>
                    </div>

                    <div className="flex items-start gap-3 text-[14px] text-slate-600">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500 mt-1.5 shrink-0 ring-4 ring-rose-50"></div>
                      <span className="leading-snug flex-1">
                        <span className="font-medium text-slate-700">
                          Drop:{" "}
                        </span>
                        {order.address}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Meal Items Summary */}
              <div className="bg-slate-50/70 rounded-xl p-2.5 flex items-center justify-between border border-slate-100">
                <div className="flex items-center gap-3 overflow-hidden">
                  <Image
                    src={order.mealImage}
                    alt="Meal"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-200/60 shadow-sm bg-white"
                  />
                  <p className="text-[14px] font-semibold text-[#1E4E70] truncate">
                    {order.itemSummary}
                  </p>
                </div>
                <span className="text-[13px] font-medium text-slate-500 shrink-0 ml-2">
                  {order.packCount} items
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex items-center gap-3">
                <button
                  onClick={() => router.push(`/orders/${order.id}`)}
                  className="flex-1 bg-white border border-[#1E4E70] text-[#1E4E70] hover:bg-slate-50 font-medium text-[15px] py-2.5 rounded-xl transition-all active:scale-95"
                >
                  View Details
                </button>
                {activeTab === "ready" ? (
                  <button
                    onClick={() => handlePickup(order.id)}
                    className="flex-[1.5] bg-[#1E4E70] hover:bg-[#153852] text-white font-medium text-[15px] py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 active:scale-95 border border-[#1E4E70]"
                  >
                    <PackageCheck className="w-4 h-4 text-[#A5D8FF]" />
                    <span>Confirm Pickup</span>
                  </button>
                ) : activeTab === "out_for_delivery" ? (
                  <button
                    onClick={() => handleCompleteDelivery(order.id)}
                    className="flex-[1.5] bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-[15px] py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 active:scale-95 border border-emerald-600"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-200" />
                    <span>Deliver</span>
                  </button>
                ) : (
                  <div className="flex-[1.5] bg-slate-100 border border-slate-200 text-slate-500 font-medium text-[15px] py-2.5 rounded-xl flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Completed</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
