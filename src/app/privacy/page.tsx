import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans pb-24 md:pb-0 relative">
      <main className="max-w-5xl mx-auto px-3 md:px-5 py-6 md:py-10 space-y-6">
        


        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-medium text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-500 font-medium text-sm">Last updated: August 19, 2026</p>
        </div>

        {/* Content */}
        <article className="prose prose-blue max-w-none text-gray-700 prose-headings:text-[#1E4E70] prose-headings:font-semibold prose-strong:font-semibold prose-strong:text-slate-800 prose-p:font-medium prose-li:font-medium prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-2 prose-p:mb-4 prose-p:leading-relaxed prose-h2:text-xl md:prose-h2:text-2xl">
          <p>
            Welcome to Moncradle! We are deeply committed to protecting your privacy and ensuring the security of the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use the Moncradle Delivery Partner App.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us when you register as a delivery partner, go online to accept orders, or communicate with our support team. This includes:
          </p>
          <ul>
            <li><strong>Personal Information:</strong> Your name, email address, phone number, and password.</li>
            <li><strong>Vehicle & Identification Data:</strong> Driver's license, vehicle registration, background check information, and vehicle details.</li>
            <li><strong>Location Data:</strong> We collect precise or approximate location data from your mobile device when the app is running in the foreground or background to enable order dispatching and live tracking for customers.</li>
            <li><strong>Financial Information:</strong> Bank account details for processing your earnings and payouts.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>
            The data we collect is used strictly to provide and improve the delivery experience. Specifically, we use your information to:
          </p>
          <ul>
            <li>Dispatch delivery orders to you efficiently based on your location.</li>
            <li>Allow customers and vendors to track the status of their deliveries in real-time.</li>
            <li>Calculate your earnings, process payments, and provide financial reports.</li>
            <li>Maintain, operate, and secure your account and data.</li>
            <li>Send you important administrative notifications, order updates, and support messages.</li>
          </ul>

          <h2>3. Location Tracking</h2>
          <p>
            Given the nature of the delivery service, real-time location tracking is essential. You can control location permissions through your device settings, but disabling location access will prevent you from receiving and fulfilling orders.
          </p>

          <h2>4. Data Sharing & Disclosure</h2>
          <p>
            We share your information only to facilitate the delivery process:
          </p>
          <ul>
            <li><strong>With Customers and Vendors:</strong> Your first name, photo, vehicle type, and real-time location are shared with the customer and vendor during an active delivery.</li>
            <li><strong>Service Providers:</strong> We use trusted third-party providers (e.g., payment processors, background check agencies) who are bound by strict data processing agreements.</li>
            <li><strong>Legal Requirements:</strong> If required by law, subpoena, or other legal processes.</li>
          </ul>

          <h2>5. Data Security</h2>
          <p>
            We implement robust physical, technical, and administrative security measures to protect your data from unauthorized access, disclosure, or destruction. However, please be aware that no method of transmission over the internet is 100% secure.
          </p>

          <h2>6. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy or how your data is handled, please contact our support team at:
          </p>
          <p className="font-medium text-[#1E4E70]">
            delivery-support@moncradle.com
          </p>
        </article>
      </main>
    </div>
  );
}
