import { motion } from "framer-motion";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import {
  Crown,
  Rocket,
  Sparkles,
  Zap,
  Star,
  Bell,
  CheckCircle,
  Clock,
  ArrowLeft,
} from "lucide-react";

const defaultUpdates = [
  {
    version: "2.0.0",
    title: "إطلاق المساعد الذكي ريكس",
    description:
      "أطلقنا مساعدنا الذكي ريكس الذي يتحدث العربية واللهجة الخليجية ويقدم دعماً شاملاً لعملاء REX-SHOP على مدار الساعة.",
    type: "feature",
    date: "أبريل 2026",
    highlights: [
      "دعم اللهجة الخليجية",
      "ردود فورية 24/7",
      "اقتراحات تسويقية ذكية",
    ],
  },
  {
    version: "1.9.0",
    title: "مولّد التصاميم الجرافيكية بالذكاء الاصطناعي",
    description:
      "أضفنا قسم التصميم الجرافيكي المدعوم بالذكاء الاصطناعي مع أكثر من 9,000 اقتراح تصميمي لإنشاء شعارات وهويات بصرية احترافية.",
    type: "feature",
    date: "مارس 2026",
    highlights: ["9,000+ اقتراح", "توليد في 30 ثانية", "8 أساليب تصميمية"],
  },
  {
    version: "1.8.0",
    title: "ربط متاجر سلة وزد وشوبيفاي",
    description:
      "تكامل مباشر مع أبرز منصات التجارة الإلكترونية في المنطقة. الآن يمكنك إدارة متجرك وحملاتك التسويقية من مكان واحد.",
    type: "feature",
    date: "فبراير 2026",
    highlights: ["ربط متجر سلة", "ربط متجر زد", "مزامنة المنتجات"],
  },
  {
    version: "1.7.0",
    title: "المحاسب المالي الذكي",
    description:
      "أضفنا ميزة المحاسب المالي الذكي الذي يتتبع إيراداتك ومصروفاتك ويقدم تقارير مالية شاملة وتوقعات دقيقة.",
    type: "feature",
    date: "يناير 2026",
    highlights: ["تتبع الإيرادات", "تقارير شهرية", "توقعات ذكية"],
  },
  {
    version: "1.6.0",
    title: "تحسينات الأداء والسرعة",
    description:
      "قمنا بتحسين سرعة المنصة بنسبة 40% وتحسين تجربة المستخدم على الأجهزة المحمولة.",
    type: "improvement",
    date: "ديسمبر 2025",
    highlights: ["سرعة أعلى بـ 40%", "تحسين الجوال", "واجهة محدّثة"],
  },
];

const upcoming = [
  {
    title: "توليد فيديوهات إعلانية بالذكاء الاصطناعي",
    eta: "Q2 2026",
    icon: "🎥",
  },
  { title: "تكامل مع TikTok Ads", eta: "Q2 2026", icon: "🎵" },
  { title: "تحليلات متقدمة بالذكاء الاصطناعي", eta: "Q3 2026", icon: "📊" },
  { title: "نظام إدارة العملاء CRM", eta: "Q3 2026", icon: "👥" },
  { title: "تطبيق جوال iOS وAndroid", eta: "Q4 2026", icon: "📱" },
  { title: "تكامل مع Snapchat Ads", eta: "Q4 2026", icon: "👻" },
];

const typeColors: Record<string, string> = {
  feature: "text-blue-400 bg-blue-900/20 border-blue-800",
  improvement: "text-green-400 bg-green-900/20 border-green-800",
  bugfix: "text-orange-400 bg-orange-900/20 border-orange-800",
  announcement: "text-yellow-400 bg-yellow-900/20 border-yellow-800",
};

const typeLabels: Record<string, string> = {
  feature: "ميزة جديدة",
  improvement: "تحسين",
  bugfix: "إصلاح",
  announcement: "إعلان",
};

export default function Updates() {
  const { isAuthenticated } = useAuth();
  const { data: dbUpdates } = trpc.updates.list.useQuery();

  const displayUpdates =
    dbUpdates && dbUpdates.length > 0
      ? dbUpdates.map(u => ({
          version: u.version || "1.0",
          title: u.title,
          description: u.description,
          type: u.type,
          date: new Date(u.createdAt).toLocaleDateString("ar-SA", {
            year: "numeric",
            month: "long",
          }),
          highlights: [],
        }))
      : defaultUpdates;

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
            <Link
              href="/"
              className="text-gray-300 hover:text-yellow-400 transition-colors"
            >
              الرئيسية
            </Link>
            <Link
              href="/services"
              className="text-gray-300 hover:text-yellow-400 transition-colors"
            >
              الخدمات
            </Link>
            <Link
              href="/design"
              className="text-gray-300 hover:text-yellow-400 transition-colors"
            >
              التصميم
            </Link>
            <Link
              href="/campaigns"
              className="text-gray-300 hover:text-yellow-400 transition-colors"
            >
              الحملات
            </Link>
            <Link
              href="/support"
              className="text-gray-300 hover:text-yellow-400 transition-colors"
            >
              الدعم
            </Link>
            <Link href="/updates" className="text-yellow-400 font-bold">
              التحديثات
            </Link>
          </div>
          <div>
            {isAuthenticated ? (
              <Link href="/dashboard">
                <button className="btn-gold px-4 py-2 rounded-lg text-sm font-bold">
                  لوحة التحكم
                </button>
              </Link>
            ) : (
              <a
                href={getLoginUrl()}
                className="btn-gold px-4 py-2 rounded-lg text-sm font-bold"
              >
                ابدأ مجاناً
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 animated-bg opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-yellow-900/30 border border-yellow-600/40 rounded-full px-4 py-2 mb-8"
          >
            <Bell className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-300 text-sm">
              آخر التحديثات والمميزات الجديدة
            </span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            <span className="gold-gradient">سجل التحديثات</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            نطور REX-SHOP باستمرار لنقدم لك أفضل تجربة تسويقية رقمية
          </p>
        </div>
      </section>

      {/* Updates Timeline */}
      <section className="py-8 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute right-8 top-0 bottom-0 w-px bg-gradient-to-b from-yellow-600 via-yellow-900/50 to-transparent" />

            <div className="space-y-8">
              {displayUpdates.map((update, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="relative pr-20"
                >
                  {/* Timeline dot */}
                  <div className="absolute right-5 top-6 w-7 h-7 rounded-full gold-gradient-bg flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-black" />
                  </div>

                  <div className="feature-card bg-[#111] rounded-2xl p-6">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full border ${typeColors[update.type] || typeColors.feature}`}
                      >
                        {typeLabels[update.type] || update.type}
                      </span>
                      <span className="text-gray-600 text-sm font-mono">
                        v{update.version}
                      </span>
                      <span className="text-gray-600 text-sm flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {update.date}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-white mb-3">
                      {update.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {update.description}
                    </p>

                    {update.highlights && update.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {update.highlights.map((h, j) => (
                          <span
                            key={j}
                            className="flex items-center gap-1 text-xs text-gray-300 bg-[#1a1a1a] px-3 py-1 rounded-full"
                          >
                            <CheckCircle className="w-3 h-3 text-yellow-500" />
                            {h}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Features */}
      <section className="py-16 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-yellow-500 text-sm font-bold uppercase tracking-widest">
              قريباً
            </span>
            <h2 className="text-3xl md:text-4xl font-black mt-3 mb-4">
              ما ينتظرك في <span className="gold-gradient">REX-SHOP</span>
            </h2>
            <p className="text-gray-400">
              نعمل باستمرار على إضافة مميزات جديدة لتلبية احتياجاتك
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="feature-card bg-[#111] rounded-2xl p-6"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-white font-bold mb-2">{item.title}</h3>
                <div className="flex items-center gap-2 text-yellow-500 text-sm">
                  <Rocket className="w-4 h-4" />
                  متوقع: {item.eta}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe to Updates */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-[#111] rounded-3xl p-10 border border-yellow-900/30 gold-glow">
            <Bell className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-white mb-3">
              كن أول من يعرف بالتحديثات الجديدة
            </h2>
            <p className="text-gray-400 mb-6">
              سجّل حسابك وستصلك إشعارات فورية بكل تحديث وميزة جديدة في REX-SHOP
            </p>
            <a
              href={getLoginUrl()}
              className="btn-gold px-8 py-3 rounded-xl font-bold inline-flex items-center gap-2"
            >
              <Star className="w-5 h-5" />
              سجّل الآن مجاناً
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#080808] border-t border-yellow-900/20 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} REX-SHOP. جميع الحقوق محفوظة لـ
            REX-SHOP™
          </p>
        </div>
      </footer>
    </div>
  );
}
