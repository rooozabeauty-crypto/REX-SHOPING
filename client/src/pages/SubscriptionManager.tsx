import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import {
  ArrowRight, AlertCircle, CheckCircle, Clock, Zap,
  TrendingUp, Users, Sparkles, Shield
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export default function SubscriptionManager() {
  const { user, isAuthenticated } = useAuth();
  const [isUpgrading, setIsUpgrading] = useState(false);

  // Queries
  const subscriptionQuery = trpc.stripe.getSubscription.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const createCheckout = trpc.stripe.createCheckoutSession.useMutation({
    onSuccess: (data: any) => {
      if (data?.url) {
        window.open(data.url, "_blank");
        toast.success("جاري فتح صفحة الدفع...");
      }
    },
    onError: () => {
      toast.error("حدث خطأ. حاول مرة أخرى.");
      setIsUpgrading(false);
    },
  });

  const currentSubscription = subscriptionQuery.data;
  const currentPlan = currentSubscription?.stripePriceId === "price_pro"
    ? "pro"
    : currentSubscription?.stripePriceId === "price_enterprise"
    ? "enterprise"
    : "basic";

  const plans = [
    {
      id: "basic",
      name: "الخطة الأساسية",
      price: "$29.99",
      period: "شهر",
      description: "للمتاجر الصغيرة",
      priceId: "price_basic",
      features: [
        { text: "50 حملة شهرياً", included: true },
        { text: "100 تصميم شهرياً", included: true },
        { text: "مساعد ريكس", included: true },
        { text: "دعم البريد", included: true },
        { text: "تحليلات أساسية", included: true },
        { text: "متجر واحد", included: false },
        { text: "دعم الأولوية", included: false },
      ],
    },
    {
      id: "pro",
      name: "الخطة الاحترافية",
      price: "$79.99",
      period: "شهر",
      description: "للمتاجر المتنامية",
      priceId: "price_pro",
      features: [
        { text: "500 حملة شهرياً", included: true },
        { text: "500 تصميم شهرياً", included: true },
        { text: "مساعد ريكس متقدم", included: true },
        { text: "دعم الأولوية 24/7", included: true },
        { text: "تحليلات متقدمة", included: true },
        { text: "5 متاجر", included: true },
        { text: "فريق (3 أعضاء)", included: true },
      ],
    },
    {
      id: "enterprise",
      name: "الخطة المتقدمة",
      price: "$199.99",
      period: "شهر",
      description: "للشركات الكبرى",
      priceId: "price_enterprise",
      features: [
        { text: "حملات غير محدودة", included: true },
        { text: "تصاميم غير محدودة", included: true },
        { text: "مساعد ريكس غير محدود", included: true },
        { text: "دعم مخصص 24/7", included: true },
        { text: "تحليلات متقدمة جداً", included: true },
        { text: "متاجر غير محدودة", included: true },
        { text: "فريق غير محدود", included: true },
      ],
    },
  ];

  const handleUpgrade = (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      setIsUpgrading(true);
      createCheckout.mutate({
        priceId: plan.priceId,
        planId: planId,
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">يرجى تسجيل الدخول</p>
          <Link href="/">
            <button className="btn-gold px-6 py-2 rounded-lg">العودة</button>
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
          <h1 className="text-4xl font-black text-white mb-2">إدارة الاشتراك</h1>
          <p className="text-gray-400">ترقية أو تخفيض خطتك في أي وقت</p>
        </div>
      </div>

      {/* Current Plan */}
      {currentSubscription && (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-yellow-600/10 to-yellow-700/10 rounded-xl p-8 border border-yellow-600/30 mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-black text-white mb-2">خطتك الحالية</h2>
                <p className="text-gray-400">
                  {currentPlan === "pro"
                    ? "الخطة الاحترافية"
                    : currentPlan === "enterprise"
                    ? "الخطة المتقدمة"
                    : "الخطة الأساسية"}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  {currentSubscription.status === "active" ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-green-400 font-bold">نشطة</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-5 h-5 text-yellow-400" />
                      <span className="text-yellow-400 font-bold">قيد الانتظار</span>
                    </>
                  )}
                </div>
                <p className="text-gray-400 text-sm">
                  التجديد في{" "}
                  {currentSubscription.currentPeriodEnd
                    ? format(new Date(currentSubscription.currentPeriodEnd), "dd MMM", { locale: ar })
                    : "—"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#0a0a0a] rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-1">الحملات الشهرية</p>
                <p className="text-white font-bold text-lg">
                  {currentPlan === "pro"
                    ? "500"
                    : currentPlan === "enterprise"
                    ? "∞"
                    : "50"}
                </p>
              </div>
              <div className="bg-[#0a0a0a] rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-1">التصاميم الشهرية</p>
                <p className="text-white font-bold text-lg">
                  {currentPlan === "pro"
                    ? "500"
                    : currentPlan === "enterprise"
                    ? "∞"
                    : "100"}
                </p>
              </div>
              <div className="bg-[#0a0a0a] rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-1">عدد المتاجر</p>
                <p className="text-white font-bold text-lg">
                  {currentPlan === "pro"
                    ? "5"
                    : currentPlan === "enterprise"
                    ? "∞"
                    : "1"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Plans Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-black text-white mb-12">الخطط المتاحة</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`rounded-xl border transition-all ${
                currentPlan === plan.id
                  ? "border-yellow-500 bg-gradient-to-b from-yellow-900/20 to-[#111] shadow-lg shadow-yellow-500/20"
                  : "border-gray-800 bg-[#111] hover:border-yellow-600/30"
              }`}
            >
              <div className="p-8">
                {currentPlan === plan.id && (
                  <div className="mb-4">
                    <span className="inline-block bg-yellow-600 text-black px-3 py-1 rounded-full text-xs font-bold">
                      ✓ خطتك الحالية
                    </span>
                  </div>
                )}

                <h3 className="text-2xl font-black text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    <span className="text-gray-400">/{plan.period}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={currentPlan === plan.id || isUpgrading}
                  className={`w-full py-3 rounded-lg font-bold text-sm transition-all mb-8 ${
                    currentPlan === plan.id
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                      : "btn-gold hover:shadow-lg hover:shadow-yellow-500/30"
                  } disabled:opacity-50`}
                >
                  {currentPlan === plan.id
                    ? "خطتك الحالية"
                    : currentPlan === "enterprise"
                    ? "تخفيض"
                    : "الترقية"}
                </button>

                <div className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={feature.included ? "text-green-400" : "text-gray-600"}>
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <span className={feature.included ? "text-gray-300" : "text-gray-600 line-through"}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <section className="py-16 bg-[#0d0d0d]">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-black text-white mb-12 text-center">أسئلة شائعة</h2>

          <div className="space-y-6">
            {[
              {
                q: "هل يمكنني تغيير الخطة؟",
                a: "نعم! يمكنك الترقية أو الخفض في أي وقت. التغييرات تسري فوراً.",
              },
              {
                q: "ماذا يحدث عند الترقية؟",
                a: "ستُحسب لك الفرقة بناءً على الأيام المتبقية من اشتراكك الحالي.",
              },
              {
                q: "هل يمكنني الإلغاء؟",
                a: "نعم! يمكنك إلغاء الاشتراك في أي وقت. لن يتم فرض رسوم إضافية.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="bg-[#111] rounded-xl p-6 border border-gray-800"
              >
                <h3 className="text-white font-bold mb-3">{item.q}</h3>
                <p className="text-gray-400">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#080808] border-t border-yellow-900/20 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} REX-SHOP. جميع الحقوق محفوظة لـ REX-SHOP™
          </p>
        </div>
      </footer>
    </div>
  );
}
