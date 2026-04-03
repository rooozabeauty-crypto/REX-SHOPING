import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import {
  Crown, Check, Zap, Sparkles, ArrowRight,
  Shield, Headphones, TrendingUp
} from "lucide-react";
import { toast } from "sonner";

const plans = [
  {
    id: "basic",
    name: "الخطة الأساسية",
    price: 29.99,
    priceAr: "29.99 دولار",
    period: "شهر",
    description: "مثالية للمتاجر الصغيرة",
    highlighted: false,
    features: [
      { text: "50 حملة تسويقية شهرياً", included: true },
      { text: "100 تصميم جرافيكي شهرياً", included: true },
      { text: "مساعد ريكس الذكي", included: true },
      { text: "دعم البريد الإلكتروني", included: true },
      { text: "تحليلات أساسية", included: true },
      { text: "ربط متجر واحد", included: false },
      { text: "دعم الأولوية", included: false },
    ],
    priceId: "price_basic",
  },
  {
    id: "pro",
    name: "الخطة الاحترافية",
    price: 79.99,
    priceAr: "79.99 دولار",
    period: "شهر",
    description: "للمتاجر المتنامية",
    highlighted: true,
    features: [
      { text: "500 حملة تسويقية شهرياً", included: true },
      { text: "500 تصميم جرافيكي شهرياً", included: true },
      { text: "مساعد ريكس الذكي المتقدم", included: true },
      { text: "دعم الأولوية 24/7", included: true },
      { text: "تحليلات متقدمة", included: true },
      { text: "ربط 5 متاجر", included: true },
      { text: "إدارة فريق (3 أعضاء)", included: true },
    ],
    priceId: "price_pro",
  },
  {
    id: "enterprise",
    name: "الخطة المتقدمة",
    price: 199.99,
    priceAr: "199.99 دولار",
    period: "شهر",
    description: "للشركات الكبرى",
    highlighted: false,
    features: [
      { text: "حملات تسويقية غير محدودة", included: true },
      { text: "تصاميم جرافيكية غير محدودة", included: true },
      { text: "مساعد ريكس الذكي غير محدود", included: true },
      { text: "دعم مخصص 24/7", included: true },
      { text: "تحليلات متقدمة جداً", included: true },
      { text: "ربط متاجر غير محدودة", included: true },
      { text: "استشارات تسويقية شهرية", included: true },
    ],
    priceId: "price_enterprise",
  },
];

export default function Pricing() {
  const { isAuthenticated, user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const createCheckout = trpc.stripe?.createCheckoutSession?.useMutation({
    onSuccess: (data: any) => {
      if (data?.url) {
        window.open(data.url, "_blank");
        toast.success("جاري فتح صفحة الدفع...");
      }
    },
    onError: () => {
      toast.error("حدث خطأ. حاول مرة أخرى.");
      setIsLoading(false);
    },
  });

  const handleSelectPlan = (planId: string) => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }

    setIsLoading(true);
    setSelectedPlan(planId);

    const plan = plans.find(p => p.id === planId);
    if (plan && user && createCheckout) {
      createCheckout.mutate({
        priceId: plan.priceId,
        planId: planId,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" dir="rtl">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-yellow-900/20">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <Crown className="w-8 h-8 text-yellow-500" />
              <span className="text-xl font-black gold-gradient">REX-SHOP</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/" className="text-gray-300 hover:text-yellow-400 transition-colors">الرئيسية</Link>
            <Link href="/services" className="text-gray-300 hover:text-yellow-400 transition-colors">الخدمات</Link>
            <Link href="/pricing" className="text-yellow-400 font-bold">الأسعار</Link>
            <Link href="/support" className="text-gray-300 hover:text-yellow-400 transition-colors">الدعم</Link>
          </div>
          <div>
            {isAuthenticated ? (
              <Link href="/dashboard">
                <button className="btn-gold px-4 py-2 rounded-lg text-sm font-bold">لوحة التحكم</button>
              </Link>
            ) : (
              <a href={getLoginUrl()} className="btn-gold px-4 py-2 rounded-lg text-sm font-bold">ابدأ مجاناً</a>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ background: "radial-gradient(ellipse at center, #4a2a00 0%, #0a0a0a 70%)" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-yellow-900/20 border border-yellow-600/30 rounded-full px-4 py-2 mb-8"
          >
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-300 text-sm">اختر الخطة المناسبة لك</span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            <span className="text-white">أسعار</span>
            <br />
            <span className="gold-gradient">شفافة وعادلة</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            ابدأ مع REX-SHOP مجاناً، وارق إلى الخطة التي تناسب احتياجاتك
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`rounded-3xl border transition-all ${
                  plan.highlighted
                    ? "border-yellow-500/50 bg-gradient-to-b from-yellow-900/20 to-[#111] shadow-2xl shadow-yellow-500/20 scale-105"
                    : "border-gray-800 bg-[#111] hover:border-yellow-600/30"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-black px-6 py-1 rounded-full text-sm font-black">
                      الأكثر شهرة ⭐
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <h3 className="text-2xl font-black text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-black text-white">${plan.price}</span>
                      <span className="text-gray-400">/{plan.period}</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-2">بدون التزام، يمكنك الإلغاء في أي وقت</p>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    disabled={isLoading && selectedPlan === plan.id || !createCheckout}
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all mb-8 flex items-center justify-center gap-2 ${
                      plan.highlighted
                        ? "btn-gold hover:shadow-lg hover:shadow-yellow-500/30"
                        : "bg-gray-800 hover:bg-gray-700 text-white"
                    } disabled:opacity-50`}
                  >
                    {isLoading && selectedPlan === plan.id ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        جاري المعالجة...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        اختر هذه الخطة
                      </>
                    )}
                  </button>

                  {/* Features */}
                  <div className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className={`mt-1 ${feature.included ? "text-green-400" : "text-gray-600"}`}>
                          <Check className="w-5 h-5" />
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
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-black text-white mb-12 text-center">
            مقارنة شاملة بين الخطط
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-right py-4 px-4 text-gray-400 font-bold">الميزة</th>
                  {plans.map((plan) => (
                    <th key={plan.id} className="text-center py-4 px-4 text-white font-bold">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "الحملات الشهرية", values: ["50", "500", "غير محدود"] },
                  { label: "التصاميم الشهرية", values: ["100", "500", "غير محدود"] },
                  { label: "مساعد ريكس", values: ["✓", "✓ متقدم", "✓ غير محدود"] },
                  { label: "دعم العملاء", values: ["البريد", "أولوية 24/7", "مخصص 24/7"] },
                  { label: "التحليلات", values: ["أساسية", "متقدمة", "متقدمة جداً"] },
                  { label: "عدد المتاجر", values: ["1", "5", "غير محدود"] },
                  { label: "إدارة الفريق", values: ["—", "3 أعضاء", "غير محدود"] },
                  { label: "استشارات", values: ["—", "—", "شهرية"] },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-900 hover:bg-[#111] transition-colors">
                    <td className="py-4 px-4 text-gray-400 font-medium">{row.label}</td>
                    {row.values.map((value, j) => (
                      <td key={j} className="py-4 px-4 text-center text-gray-300">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-black text-white mb-12 text-center">
            أسئلة شائعة عن الأسعار
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "هل يمكنني تغيير الخطة لاحقاً؟",
                a: "نعم! يمكنك الترقية أو الخفض في أي وقت. التغييرات تسري فوراً.",
              },
              {
                q: "هل هناك فترة تجريبية مجانية؟",
                a: "نعم! جميع المستخدمين الجدد يحصلون على 14 يوم تجريبي مجاني.",
              },
              {
                q: "ما طرق الدفع المتاحة؟",
                a: "نقبل جميع بطاقات الائتمان والمدى وApple Pay وتحويل بنكي.",
              },
              {
                q: "هل يمكنني الحصول على فاتورة؟",
                a: "بالتأكيد! تُرسل الفواتير تلقائياً إلى بريدك الإلكتروني.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="bg-[#111] rounded-xl p-6 border border-gray-800 hover:border-yellow-600/30 transition-colors"
              >
                <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-yellow-600 flex items-center justify-center text-xs">
                    {i + 1}
                  </span>
                  {item.q}
                </h3>
                <p className="text-gray-400">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-yellow-600/10 to-yellow-700/10 border-y border-yellow-900/20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">
            جاهز للبدء؟
          </h2>
          <p className="text-gray-400 mb-8">
            اختر الخطة المناسبة وابدأ رحلتك مع REX-SHOP اليوم
          </p>
          <a href={getLoginUrl()} className="inline-flex items-center gap-2 btn-gold px-8 py-3 rounded-xl font-bold">
            ابدأ مجاناً الآن
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#080808] border-t border-yellow-900/20 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} REX-SHOP. جميع الحقوق محفوظة لـ REX-SHOP™ | منصة التسويق الرقمي الذكي
          </p>
        </div>
      </footer>
    </div>
  );
}
