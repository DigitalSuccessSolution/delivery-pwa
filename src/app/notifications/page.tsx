"use client";

import { useState, useEffect } from "react";
import api from "@/lib/axios";
import {
  Bell,
  CheckCircle2,
  Trash2,
  X,
  Loader2
} from "lucide-react";
import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchNotifications, markAsRead, deleteNotification, NotificationItem } from "@/store/slices/notificationSlice";

export default function NotificationsPage() {
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { items: notifications, loading } = useSelector((state: RootState) => state.notifications);
  const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null);

  // Helper to format date
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // in seconds
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 172800) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const handleFetchNotifications = () => {
    dispatch(fetchNotifications());
  };

  useEffect(() => {
    setMounted(true);
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleMarkAsRead = async (id: string) => {
    dispatch(markAsRead(id));
  };

  const markAllAsRead = async () => {
    const unreadNotifications = notifications.filter(n => !n.isRead);
    if (unreadNotifications.length === 0) return;

    try {
      // Dispatch individually for now
      await Promise.all(unreadNotifications.map(n => 
        dispatch(markAsRead(n._id)).unwrap()
      ));
    } catch (error) {
      console.error("Failed to mark all as read:", error);
      dispatch(fetchNotifications()); // Reload to fix state
    }
  };

  const handleDeleteNotification = (id: string) => {
    Swal.fire({
      title: 'Delete this notification?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1E4E70',
      cancelButtonColor: '#f43f5e',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
      backdrop: 'rgba(15, 23, 42, 0.4)',
      customClass: {
        popup: 'rounded-2xl',
        title: 'text-lg font-semibold text-slate-800',
        confirmButton: 'rounded-lg font-medium shadow-sm',
        cancelButton: 'rounded-lg font-medium',
        container: 'backdrop-blur-sm'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(deleteNotification(id)).unwrap();
          if (selectedNotification?._id === id) {
             setSelectedNotification(null);
          }
          Swal.fire({
            title: 'Deleted!',
            text: 'Notification has been deleted.',
            icon: 'success',
            confirmButtonColor: '#1E4E70',
            backdrop: 'rgba(15, 23, 42, 0.4)',
            customClass: {
              popup: 'rounded-2xl',
              confirmButton: 'rounded-lg font-medium shadow-sm',
              container: 'backdrop-blur-sm'
            }
          });
        } catch (error) {
           Swal.fire('Error', 'Failed to delete notification', 'error');
        }
      }
    });
  };

  const handleClearAll = () => {
    if (notifications.length === 0) return;
    
    Swal.fire({
      title: 'Clear all notifications?',
      text: "You won't be able to revert this action!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1E4E70',
      cancelButtonColor: '#f43f5e',
      confirmButtonText: 'Yes, clear all',
      cancelButtonText: 'Cancel',
      backdrop: 'rgba(15, 23, 42, 0.4)',
      customClass: {
        popup: 'rounded-2xl',
        title: 'text-lg font-semibold text-slate-800',
        confirmButton: 'rounded-lg font-medium shadow-sm',
        cancelButton: 'rounded-lg font-medium',
        container: 'backdrop-blur-sm'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await Promise.all(notifications.map(n => 
             dispatch(deleteNotification(n._id)).unwrap()
          ));
          Swal.fire({
            title: 'Cleared!',
            text: 'Your notifications have been cleared.',
            icon: 'success',
            confirmButtonColor: '#1E4E70',
            backdrop: 'rgba(15, 23, 42, 0.4)',
            customClass: {
              popup: 'rounded-2xl',
              confirmButton: 'rounded-lg font-medium shadow-sm',
              container: 'backdrop-blur-sm'
            }
          });
        } catch (error) {
           Swal.fire('Error', 'Failed to clear all notifications', 'error');
           dispatch(fetchNotifications());
        }
      }
    });
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-6 animate-fadeIn pb-16 max-w-2xl mx-auto lg:max-w-none lg:mx-0 font-sans">
      
      {/* Header Section */}
      <div className="flex flex-row items-center justify-between gap-1 sm:gap-4 animate-fade-in-up">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[18px] sm:text-3xl font-medium text-slate-900 tracking-tight mb-0 sm:mb-1">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <span className="inline-block bg-[#1E4E70]/10 text-[#1E4E70] text-[11px] sm:text-[13px] font-medium px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full whitespace-nowrap">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <p className="text-sm text-slate-700 font-medium hidden md:block">
              Real-time updates for your deliveries
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-1 sm:gap-2 shrink-0">
          <button
            onClick={markAllAsRead}
            disabled={loading || notifications.length === 0}
            className="bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 text-slate-700 text-[12px] sm:text-[13px] font-medium px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-slate-200 transition-colors flex items-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap"
            title="Mark All Read"
          >
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1E4E70] shrink-0" />
            <span>Mark All Read</span>
          </button>
          <button
            onClick={handleClearAll}
            disabled={loading || notifications.length === 0}
            className="bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-rose-50 text-rose-600 font-medium w-8 h-8 sm:w-10 sm:h-[38px] rounded-lg border border-slate-200 transition-colors flex items-center justify-center cursor-pointer shrink-0"
            title="Clear All Notifications"
          >
            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Notifications List Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20 animate-fade-in-up">
          <Loader2 className="w-8 h-8 text-[#1E4E70] animate-spin" />
        </div>
      ) : notifications.length === 0 ? (
        <div className="sm:bg-white sm:rounded-lg py-16 sm:p-12 text-center sm:border sm:border-slate-200/80 space-y-3 animate-fade-in-up" style={{ animationDelay: '100ms', opacity: 0, animationFillMode: 'forwards' }}>
          <Bell className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-[17px] font-medium text-slate-900">No Notifications</h3>
          <p className="text-[14px] text-slate-500 font-medium max-w-sm mx-auto mt-2">
            You're all caught up! No new alerts at the moment.
          </p>
        </div>
      ) : (
        <div className="-mx-4 sm:mx-0 sm:bg-white sm:rounded-lg sm:border border-slate-200/80 overflow-hidden divide-y divide-slate-100 animate-fade-in-up" style={{ animationDelay: '100ms', opacity: 0, animationFillMode: 'forwards' }}>
          {notifications.map((n) => (
            <div
              key={n._id}
              onClick={() => {
                setSelectedNotification(n);
                if (!n.isRead) {
                  handleMarkAsRead(n._id);
                }
              }}
              className={`group px-4 py-5 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors cursor-pointer ${
                !n.isRead ? "bg-[#1E4E70]/5 sm:hover:bg-[#1E4E70]/10" : "bg-white sm:hover:bg-slate-50/60"
              }`}
            >
              <div className="flex items-start gap-4 min-w-0 w-full">
                <div className="pt-0.5 sm:pt-1 text-[#1E4E70] shrink-0">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </div>

                <div className="min-w-0 w-full flex flex-col gap-1 mt-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <h3 className="font-medium text-slate-900 text-[15px] sm:text-[16px] leading-tight truncate">
                        {n.title}
                      </h3>
                      {!n.isRead && (
                        <span className="w-2 h-2 rounded-full bg-[#1E4E70] shrink-0" />
                      )}
                    </div>
                    <span className="text-[13px] font-medium text-slate-500 whitespace-nowrap shrink-0 mt-0.5">
                      {formatTime(n.createdAt)}
                    </span>
                  </div>
                  <p className="text-[12px] sm:text-[13px] text-slate-700 font-medium leading-relaxed pr-2 sm:pr-8">
                    {n.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Notification Details Modal */}
      {mounted && selectedNotification && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div 
            className="absolute inset-0 bg-slate-900/40 transition-opacity" 
            style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
            onClick={() => setSelectedNotification(null)}
          />
          <div className="relative bg-white w-full sm:max-w-md h-auto max-h-[85vh] overflow-hidden animate-slide-up shadow-2xl rounded-t-2xl sm:rounded-2xl pointer-events-auto flex flex-col font-sans">
            <div className="flex items-center justify-between px-6 py-4 bg-white/50 backdrop-blur-sm border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="bg-[#1E4E70]/10 p-2 rounded-xl text-[#1E4E70]">
                   <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 leading-tight">Notification Details</h3>
                  <span className="text-[12px] font-medium text-slate-500">{formatTime(selectedNotification.createdAt)}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedNotification(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <h4 className="text-[16px] font-medium text-black mb-3">{selectedNotification.title}</h4>
              <p className="text-[13px] text-slate-700 leading-relaxed">
                {selectedNotification.message}
              </p>
            </div>

            <div className="p-4 bg-white border-t border-slate-50">
               <button 
                 onClick={() => handleDeleteNotification(selectedNotification._id)}
                 className="w-full text-center text-rose-500 hover:text-rose-600 font-medium text-[14px] py-2 transition-colors flex justify-center items-center gap-2"
               >
                 <Trash2 className="w-4 h-4" /> Delete Notification
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
