import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import {
  CreditCard, Download, Calendar, DollarSign, AlertCircle,
  CheckCircle, Clock, ArrowRight, Crown
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export default function Billing() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<"subscription" | "invoices" | "payment-methods">("subscription");

  // Queries
  const subscriptionQuery = trpc.stripe.getSubscription.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const invoicesQuery = trpc.stripe.getInvoices.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const paymentHistoryQuery = trpc.stripe.getPaymentHistory.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">يرجى تسجيل الدخول لعرض معلومات الفواتير</p>
          <Link href="/">
            <button className="btn-gold px-6 py-2 rounded-lg">العودة للرئيسية</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-600/10 to-yellow-700/10 border-b border-yellow-900/20 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/dashboard">
            <button className="text-yellow-400 hover:text-yellow-300 mb-4 flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              العودة إلى لوحة التحكم
            </button>
          </Link>
          <h1 className="text-4xl font-black text-white mb-2">الفواتير والدفع</h1>
          <p className="text-gray-400">إدارة اشتراكك والفواتير والدفعات</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-800">
          {[
            { id: "subscription", label: "الاشتراك الحالي", icon: Crown },
            { id: "invoices", label: "الفواتير", icon: CreditCard },
            { id: "payment-methods", label: "طرق الدفع", icon: DollarSign },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-yellow-500 text-yellow-400"
                    : "border-transparent text-gray-400 hover:text-gray-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Subscription Tab */}
        {activeTab === "subscription" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {subscriptionQuery.isLoading ? (
              <div className="bg-[#111] rounded-xl p-8 text-center">
                <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : subscriptionQuery.data ? (
              <div className="bg-gradient-to-br from-yellow-900/20 to-[#111] rounded-xl p-8 border border-yellow-600/30">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-black text-white mb-2">الخطة الحالية</h3>
                    <p className="text-gray-400">
                      {subscriptionQuery.data.status === "active" ? "✓ نشطة" : "غير نشطة"}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-black text-yellow-400">
                      {subscriptionQuery.data.stripePriceId === "price_pro"
                        ? "$79.99"
                        : subscriptionQuery.data.stripePriceId === "price_enterprise"
                        ? "$199.99"
                        : "$29.99"}
                    </div>
                    <p className="text-gray-400">شهرياً</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#0a0a0a] rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-1">تاريخ البدء</p>
                    <p className="text-white font-bold">
                      {subscriptionQuery.data.currentPeriodStart
                        ? format(new Date(subscriptionQuery.data.currentPeriodStart), "dd MMM yyyy", { locale: ar })
                        : "—"}
                    </p>
                  </div>
                  <div className="bg-[#0a0a0a] rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-1">تاريخ التجديد</p>
                    <p className="text-white font-bold">
                      {subscriptionQuery.data.currentPeriodEnd
                        ? format(new Date(subscriptionQuery.data.currentPeriodEnd), "dd MMM yyyy", { locale: ar })
                        : "—"}
                    </p>
                  </div>
                </div>

                <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-bold transition-colors">
                  تحديث طريقة الدفع
                </button>
              </div>
            ) : (
              <div className="bg-[#111] rounded-xl p-8 border border-gray-800">
                <div className="flex items-center gap-4">
                  <AlertCircle className="w-6 h-6 text-yellow-500" />
                  <div>
                    <h3 className="text-white font-bold mb-1">لا توجد اشتراكات نشطة</h3>
                    <p className="text-gray-400 text-sm">
                      اختر خطة من صفحة الأسعار للبدء
                    </p>
                  </div>
                </div>
                <Link href="/pricing">
                  <button className="mt-4 btn-gold px-6 py-2 rounded-lg">
                    عرض الخطط
                  </button>
                </Link>
              </div>
            )}
          </motion.div>
        )}

        {/* Invoices Tab */}
        {activeTab === "invoices" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {invoicesQuery.isLoading ? (
              <div className="bg-[#111] rounded-xl p-8 text-center">
                <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : invoicesQuery.data && invoicesQuery.data.length > 0 ? (
              <div className="space-y-4">
                {invoicesQuery.data.map((invoice) => (
                  <motion.div
                    key={invoice.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#111] rounded-lg p-6 border border-gray-800 hover:border-yellow-600/30 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-yellow-900/20 p-3 rounded-lg">
                        <CreditCard className="w-6 h-6 text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold">
                          الفاتورة #{invoice.stripeInvoiceId.slice(-8)}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {format(new Date(invoice.createdAt), "dd MMM yyyy", { locale: ar })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-white font-bold">
                          ${(invoice.amount / 100).toFixed(2)}
                        </p>
                        <p className={`text-sm ${
                          invoice.status === "paid" ? "text-green-400" : "text-yellow-400"
                        }`}>
                          {invoice.status === "paid" ? "مدفوعة" : "قيد الانتظار"}
                        </p>
                      </div>
                      {invoice.pdfUrl && (
                        <a href={invoice.pdfUrl} target="_blank" rel="noopener noreferrer">
                          <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors">
                            <Download className="w-5 h-5" />
                          </button>
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-[#111] rounded-xl p-8 border border-gray-800 text-center">
                <CreditCard className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">لا توجد فواتير حتى الآن</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Payment Methods Tab */}
        {activeTab === "payment-methods" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {paymentHistoryQuery.isLoading ? (
              <div className="bg-[#111] rounded-xl p-8 text-center">
                <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : paymentHistoryQuery.data && paymentHistoryQuery.data.length > 0 ? (
              <div className="space-y-4">
                {paymentHistoryQuery.data.map((payment) => (
                  <motion.div
                    key={payment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#111] rounded-lg p-6 border border-gray-800"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-lg ${
                          payment.status === "succeeded"
                            ? "bg-green-900/20"
                            : "bg-yellow-900/20"
                        }`}>
                          {payment.status === "succeeded" ? (
                            <CheckCircle className="w-6 h-6 text-green-400" />
                          ) : (
                            <Clock className="w-6 h-6 text-yellow-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-white font-bold">{payment.description}</h3>
                          <p className="text-gray-400 text-sm">
                            {format(new Date(payment.createdAt), "dd MMM yyyy HH:mm", { locale: ar })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-lg">
                          ${(payment.amount / 100).toFixed(2)}
                        </p>
                        <p className={`text-sm ${
                          payment.status === "succeeded" ? "text-green-400" : "text-yellow-400"
                        }`}>
                          {payment.status === "succeeded" ? "نجحت" : "قيد المعالجة"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-[#111] rounded-xl p-8 border border-gray-800 text-center">
                <DollarSign className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">لا توجد عمليات دفع حتى الآن</p>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-[#080808] border-t border-yellow-900/20 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} REX-SHOP. جميع الحقوق محفوظة لـ REX-SHOP™
          </p>
        </div>
      </footer>
    </div>
  );
}
