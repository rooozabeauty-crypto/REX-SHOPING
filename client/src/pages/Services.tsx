import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import {
  Crown,
  TrendingUp,
  Globe,
  BarChart3,
  Users,
  Mail,
  ShoppingBag,
  Bot,
  Megaphone,
  Lock,
  CheckCircle,
  Zap,
  Star,
  ArrowLeft,
  Instagram,
  Twitter,
  Youtube,
  DollarSign,
  FileText,
  Target,
  Layers,
} from "lucide-react";
import { toast } from "sonner";

const services = [
  {
    id: "seo",
    icon: TrendingUp,
    title: "تحسين محركات البحث SEO",
    desc: "ظهور متجرك في صدارة نتائج البحث على جوجل وبينج",
    color: "from-green-900/30 to-green-900/10",
    border: "border-green-800/40",
    iconColor: "text-green-400",
    features: [
      "تحليل الكلمات المفتاحية المستهدفة",
      "تحسين الصفحات والمحتوى",
      "بناء الروابط الخلفية",
      "تقارير أداء أسبوعية",
      "تحسين سرعة الموقع",
    ],
    trial: "14 يوم مجاناً",
    price: "149",
  },
  {
    id: "google-ads",
    icon: Target,
    title: "إعلانات Google Ads",
    desc: "حملات إعلانية مدفوعة محسّنة لأعلى عائد استثمار",
    color: "from-blue-900/30 to-blue-900/10",
    border: "border-blue-800/40",
    iconColor: "text-blue-400",
    features: [
      "إنشاء وإدارة الحملات",
      "تحسين معدل النقر CTR",
      "استهداف الجمهور المثالي",
      "تقليل تكلفة النقرة CPC",
      "تقارير أداء يومية",
    ],
    trial: "7 أيام مجاناً",
    price: "199",
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "تحليلات Google Analytics",
    desc: "فهم سلوك زوارك واتخاذ قرارات مبنية على البيانات",
    color: "from-orange-900/30 to-orange-900/10",
    border: "border-orange-800/40",
    iconColor: "text-orange-400",
    features: [
      "إعداد وربط Google Analytics",
      "لوحات تحكم مخصصة",
      "تتبع التحويلات والمبيعات",
      "تحليل مصادر الزيارات",
      "تقارير شهرية مفصّلة",
    ],
    trial: "مجاني للأبد",
    price: "99",
  },
  {
    id: "social",
    icon: Users,
    title: "إدارة السوشيال ميديا",
    desc: "نشر المحتوى وزيادة المتابعين عبر جميع المنصات",
    color: "from-pink-900/30 to-pink-900/10",
    border: "border-pink-800/40",
    iconColor: "text-pink-400",
    features: [
      "إدارة إنستغرام وتويتر وسناب",
      "جدولة المنشورات",
      "زيادة المتابعين عضوياً",
      "التفاعل مع الجمهور",
      "تحليل أداء المنشورات",
    ],
    trial: "14 يوم مجاناً",
    price: "179",
  },
  {
    id: "followers",
    icon: Star,
    title: "زيادة المتابعين",
    desc: "نشر حساباتك وزيادة متابعيك بشكل حقيقي ومستدام",
    color: "from-yellow-900/30 to-yellow-900/10",
    border: "border-yellow-800/40",
    iconColor: "text-yellow-400",
    features: [
      "نشر الحسابات عبر شبكتنا",
      "متابعون حقيقيون ومتفاعلون",
      "استهداف جمهور مهتم",
      "نمو تدريجي وآمن",
      "تقارير نمو أسبوعية",
    ],
    trial: "7 أيام مجاناً",
    price: "129",
  },
  {
    id: "email",
    icon: Mail,
    title: "التسويق بالبريد الإلكتروني",
    desc: "حملات بريدية احترافية تزيد معدلات الفتح والتحويل",
    color: "from-purple-900/30 to-purple-900/10",
    border: "border-purple-800/40",
    iconColor: "text-purple-400",
    features: [
      "قوالب بريدية احترافية",
      "تقسيم القوائم البريدية",
      "اختبار A/B",
      "أتمتة الحملات",
      "تحليل معدلات الفتح",
    ],
    trial: "14 يوم مجاناً",
    price: "119",
  },
  {
    id: "content",
    icon: FileText,
    title: "إدارة المحتوى",
    desc: "محتوى تسويقي احترافي يجذب العملاء ويزيد المبيعات",
    color: "from-cyan-900/30 to-cyan-900/10",
    border: "border-cyan-800/40",
    iconColor: "text-cyan-400",
    features: [
      "كتابة محتوى SEO",
      "مقالات ومدونات احترافية",
      "وصف منتجات مقنع",
      "محتوى سوشيال ميديا",
      "استراتيجية محتوى شاملة",
    ],
    trial: "7 أيام مجاناً",
    price: "149",
  },
  {
    id: "finance",
    icon: DollarSign,
    title: "المحاسب المالي الذكي",
    desc: "تتبع إيراداتك ومصروفاتك مع تقارير مالية ذكية بالذكاء الاصطناعي",
    color: "from-emerald-900/30 to-emerald-900/10",
    border: "border-emerald-800/40",
    iconColor: "text-emerald-400",
    features: [
      "تتبع الإيرادات والمصروفات",
      "تقارير ربحية شهرية",
      "توقعات مالية ذكية",
      "تحليل هامش الربح",
      "تنبيهات مالية فورية",
    ],
    trial: "30 يوم مجاناً",
    price: "89",
  },
  {
    id: "strategy",
    icon: Layers,
    title: "استراتيجيات التسويق",
    desc: "خطط تسويقية مخصصة لمتجرك بناءً على تحليل السوق",
    color: "from-indigo-900/30 to-indigo-900/10",
    border: "border-indigo-800/40",
    iconColor: "text-indigo-400",
    features: [
      "تحليل المنافسين",
      "تحديد الجمهور المستهدف",
      "خطة تسويقية 90 يوم",
      "استراتيجية المحتوى",
      "مراجعة شهرية وتحديث",
    ],
    trial: "استشارة مجانية",
    price: "249",
  },
  {
    id: "stores",
    icon: ShoppingBag,
    title: "ربط المتاجر الإلكترونية",
    desc: "تكامل مباشر مع سلة وزد وشوبيفاي وووكوميرس وغيرها",
    color: "from-red-900/30 to-red-900/10",
    border: "border-red-800/40",
    iconColor: "text-red-400",
    features: [
      "ربط متجر سلة",
      "ربط متجر زد",
      "ربط شوبيفاي",
      "مزامنة المنتجات والمخزون",
      "تقارير مبيعات موحدة",
    ],
    trial: "14 يوم مجاناً",
    price: "199",
  },
];

const platforms = [
  { name: "إنستغرام", icon: "📸", color: "from-pink-600 to-purple-600" },
  { name: "تويتر/X", icon: "🐦", color: "from-blue-500 to-blue-700" },
  { name: "سناب شات", icon: "👻", color: "from-yellow-400 to-yellow-600" },
  { name: "تيك توك", icon: "🎵", color: "from-gray-800 to-gray-900" },
  { name: "يوتيوب", icon: "▶️", color: "from-red-600 to-red-800" },
  { name: "فيسبوك", icon: "👥", color: "from-blue-700 to-blue-900" },
];

export default function Services() {
  const { isAuthenticated } = useAuth();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleServiceClick = (serviceId: string) => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    setSelectedService(serviceId);
    toast.success("سيتم تفعيل الخدمة قريباً! سنتواصل معك خلال 24 ساعة.");
  };

  return (
    <div className="min-h-screen bg-[#080810] text-white" dir="rtl">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#080810]/95 backdrop-blur-md border-b border-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 rounded-full gold-gradient-bg flex items-center justify-center">
                <Crown className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-black gold-gradient">REX-SHOP</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link
              href="/"
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              الرئيسية
            </Link>
            <Link href="/services" className="text-blue-400 font-bold">
              الخدمات
            </Link>
            <Link
              href="/design"
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              التصميم
            </Link>
            <Link
              href="/campaigns"
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              الحملات
            </Link>
            <Link
              href="/assistant"
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              المساعد
            </Link>
            <Link
              href="/support"
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              الدعم
            </Link>
          </div>
          <div>
            {isAuthenticated ? (
              <Link href="/dashboard">
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                  لوحة التحكم
                </button>
              </Link>
            ) : (
              <a
                href={getLoginUrl()}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
              >
                ابدأ مجاناً
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, #1a1a4e 0%, #080810 70%)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-900/30 border border-blue-500/30 rounded-full px-4 py-2 mb-8"
          >
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm">
              خدمات تسويقية شاملة مدعومة بالذكاء الاصطناعي
            </span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            <span className="text-white">خدماتنا</span>
            <br />
            <span style={{ color: "#4fc3f7" }}>التسويقية الشاملة</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            كل ما تحتاجه لتنمية متجرك الإلكتروني في مكان واحد
          </p>
        </div>
      </section>

      {/* Social Platforms */}
      <section className="py-8 bg-[#0d0d18]">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-gray-500 text-sm mb-6">
            ندعم جميع المنصات الرئيسية
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {platforms.map((p, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 bg-gradient-to-r ${p.color} px-4 py-2 rounded-full text-white text-sm font-medium`}
              >
                <span>{p.icon}</span>
                {p.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                viewport={{ once: true }}
                className={`bg-gradient-to-br ${service.color} rounded-2xl p-6 border ${service.border} service-card`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-[#111] flex items-center justify-center`}
                  >
                    <service.icon className={`w-6 h-6 ${service.iconColor}`} />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-500">من</div>
                    <div className={`text-lg font-black ${service.iconColor}`}>
                      {service.price} ر.س
                    </div>
                    <div className="text-xs text-gray-600">/ شهرياً</div>
                  </div>
                </div>

                <h3 className="text-white font-black text-lg mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{service.desc}</p>

                {/* Features */}
                <div className="space-y-2 mb-5">
                  {service.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <CheckCircle
                        className={`w-3.5 h-3.5 ${service.iconColor} flex-shrink-0`}
                      />
                      <span className="text-gray-300 text-xs">{f}</span>
                    </div>
                  ))}
                </div>

                {/* Trial Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-xs px-2 py-1 rounded-full bg-[#111] ${service.iconColor}`}
                  >
                    ✨ {service.trial}
                  </span>
                </div>

                {/* CTA */}
                <button
                  onClick={() => handleServiceClick(service.id)}
                  className="w-full py-2.5 rounded-xl font-bold text-sm transition-all bg-[#111] hover:bg-[#1a1a1a] text-white border border-white/10 hover:border-white/20 flex items-center justify-center gap-2"
                >
                  <Zap className={`w-4 h-4 ${service.iconColor}`} />
                  تفعيل الخدمة
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why REX-SHOP */}
      <section className="py-16 bg-[#0d0d18]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-4">
              لماذا <span style={{ color: "#4fc3f7" }}>REX-SHOP</span>؟
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🤖",
                title: "ذكاء اصطناعي متقدم",
                desc: "تقنيات AI أحدث لتحسين نتائجك",
              },
              {
                icon: "🇸🇦",
                title: "خبرة خليجية",
                desc: "نفهم السوق الخليجي وطبيعته",
              },
              {
                icon: "📊",
                title: "نتائج مضمونة",
                desc: "98% من عملائنا يحققون نمواً ملموساً",
              },
              {
                icon: "🔗",
                title: "تكامل شامل",
                desc: "ربط مع أبرز منصات التجارة الإلكترونية",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="service-card bg-[#111] rounded-2xl p-6 text-center"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-white font-bold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-[#0d0d18] rounded-3xl p-10 border border-blue-900/30 blue-glow">
            <Bot className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-white mb-3">
              مش عارف من أين تبدأ؟
            </h2>
            <p className="text-gray-400 mb-6">
              تحدث مع مساعدنا الذكي ريكس وسيساعدك في اختيار الخدمات المناسبة
              لمتجرك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/assistant">
                <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-bold text-white transition-colors flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  تحدث مع ريكس
                </button>
              </Link>
              <Link href="/support">
                <button className="px-6 py-3 rounded-xl border border-blue-600/40 text-blue-300 hover:bg-blue-900/20 transition-all font-bold">
                  تواصل مع الفريق
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#060608] border-t border-blue-900/20 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} REX-SHOP. جميع الحقوق محفوظة لـ
            REX-SHOP™ | منصة التسويق الرقمي الذكي
          </p>
        </div>
      </footer>
    </div>
  );
}
