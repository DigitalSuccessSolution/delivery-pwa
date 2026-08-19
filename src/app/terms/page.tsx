import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans pb-24 md:pb-0 relative">
      <main className="max-w-5xl mx-auto px-3 md:px-5 py-6 md:py-10 space-y-6">
        


        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-medium text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-gray-500 font-medium text-sm">Last updated: August 19, 2026</p>
        </div>

        {/* Content */}
        <article className="prose prose-blue max-w-none text-gray-700 prose-headings:text-[#1E4E70] prose-headings:font-semibold prose-strong:font-semibold prose-strong:text-slate-800 prose-p:font-medium prose-li:font-medium prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-2 prose-p:mb-4 prose-p:leading-relaxed prose-h2:text-xl md:prose-h2:text-2xl">
          <p>
            Welcome to Moncradle! By accessing or using our Delivery Partner mobile application, website, and related services (collectively, the "Services"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Services.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            These Terms form a legally binding contract between you and Moncradle. By registering for a delivery partner account or using the app, you represent that you are at least 18 years old, have a valid driver's license (if applicable), and have the legal capacity to agree to these Terms.
          </p>

          <h2>2. Independent Contractor Status</h2>
          <p>
            You acknowledge and agree that your relationship with Moncradle is that of an independent contractor. Nothing in these Terms creates an employment, partnership, or agency relationship between you and Moncradle. You have complete discretion over when and how long you use the App to accept delivery requests.
          </p>

          <h2>3. Service Obligations</h2>
          <p>
            When accepting delivery requests, you agree to:
          </p>
          <ul>
            <li>Pick up orders promptly and deliver them safely to the customer's specified location.</li>
            <li>Handle all food items with care and maintain appropriate hygiene and safety standards.</li>
            <li>Use a reliable vehicle that is properly registered and insured in accordance with local laws.</li>
            <li>Maintain professional and courteous communication with vendors and customers.</li>
          </ul>

          <h2>4. App Usage & Content</h2>
          <p>
            Moncradle grants you a personal, non-exclusive, non-transferable, and revocable license to use the Services for the purpose of receiving and fulfilling delivery requests. You agree not to:
          </p>
          <ul>
            <li>Modify, copy, distribute, or reverse engineer the App or any of its contents.</li>
            <li>Use the Services for any illegal or unauthorized purpose.</li>
            <li>Manipulate the GPS location or provide false information regarding delivery statuses.</li>
          </ul>

          <h2>5. Payment and Earnings</h2>
          <p>
            Your earnings are calculated based on the successful completion of deliveries, subject to Moncradle's current payment policies. Payouts are processed on a scheduled basis. Moncradle reserves the right to adjust earnings in the event of fraud, customer complaints, or failure to complete a delivery properly.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Moncradle and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your access to or use of or inability to access or use the Services.
          </p>

          <h2>7. Changes to Terms</h2>
          <p>
            We may modify these Terms at any time. We will provide notice of significant changes by updating the date at the top of this page or by sending you an email notification. Your continued use of the Services after such changes constitutes your acceptance of the new Terms.
          </p>

          <h2>8. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="font-medium text-[#1E4E70]">
            legal@moncradle.com
          </p>
        </article>
      </main>
    </div>
  );
}
