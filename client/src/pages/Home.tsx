import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import {
  Crown,
  Sparkles,
  Zap,
  TrendingUp,
  Globe,
  Palette,
  BarChart3,
  Mail,
  Users,
  ShoppingBag,
  Bot,
  Shield,
  Star,
  CheckCircle,
  ArrowLeft,
  Megaphone,
  Lock,
  Instagram,
  Twitter,
  Youtube,
  Facebook,
} from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "تحسين محركات البحث SEO",
    desc: "ظهور متجرك في صدارة نتائج البحث مع تحليل شامل للكلمات المفتاحية",
    color: "text-blue-400",
  },
  {
    icon: Globe,
    title: "إعلانات Google Ads",
    desc: "حملات إعلانية مدفوعة محسّنة لأعلى عائد استثمار ممكن",
    color: "text-green-400",
  },
  {
    icon: BarChart3,
    title: "تحليلات Google Analytics",
    desc: "تقارير تفصيلية لأداء متجرك وسلوك زوارك",
    color: "text-yellow-400",
  },
  {
    icon: Users,
    title: "إدارة السوشيال ميديا",
    desc: "نشر المحتوى وزيادة المتابعين عبر جميع المنصات",
    color: "text-pink-400",
  },
  {
    icon: Mail,
    title: "التسويق بالبريد الإلكتروني",
    desc: "حملات بريدية احترافية تزيد معدلات الفتح والتحويل",
    color: "text-purple-400",
  },
  {
    icon: Palette,
    title: "التصميم الجرافيكي بالذكاء الاصطناعي",
    desc: "أكثر من 9,000 اقتراح تصميمي لشعارات وهويات بصرية",
    color: "text-orange-400",
  },
  {
    icon: Bot,
    title: "المحاسب المالي الذكي",
    desc: "تتبع إيراداتك ومصروفاتك مع تقارير مالية ذكية",
    color: "text-cyan-400",
  },
  {
    icon: ShoppingBag,
    title: "ربط المتاجر الإلكترونية",
    desc: "تكامل مباشر مع سلة وزد وشوبيفاي وووكوميرس",
    color: "text-red-400",
  },
  {
    icon: Megaphone,
    title: "إنشاء حملات إعلانية بالذكاء الاصطناعي",
    desc: "نصوص وبوستات وفيديوهات إعلانية احترافية في ثوانٍ",
    color: "text-indigo-400",
  },
];

const plans = [
  {
    name: "مجاني",
    price: "0",
    period: "للأبد",
    color: "border-gray-700",
    features: [
      "5 حملات إعلانية شهرياً",
      "3 تصاميم بالذكاء الاصطناعي",
      "تحليلات أساسية",
      "دعم عبر البريد",
    ],
    cta: "ابدأ مجاناً",
    popular: false,
  },
  {
    name: "احترافي",
    price: "99",
    period: "شهرياً",
    color: "border-yellow-600",
    features: [
      "حملات إعلانية غير محدودة",
      "تصاميم غير محدودة",
      "SEO متقدم",
      "ربط المتاجر الإلكترونية",
      "محاسب مالي ذكي",
      "دعم أولوية 24/7",
    ],
    cta: "ابدأ التجربة المجانية",
    popular: true,
  },
  {
    name: "مؤسسي",
    price: "299",
    period: "شهرياً",
    color: "border-blue-600",
    features: [
      "كل مميزات الاحترافي",
      "مدير حساب مخصص",
      "تقارير متقدمة مخصصة",
      "API للتكامل",
      "تدريب الفريق",
      "SLA مضمون",
    ],
    cta: "تواصل معنا",
    popular: false,
  },
];

const testimonials = [
  {
    name: "أحمد الشمري",
    role: "صاحب متجر سلة",
    text: "REX-SHOP غيّر طريقة إدارتي للمتجر. مبيعاتي زادت 3 أضعاف خلال شهرين!",
    rating: 5,
  },
  {
    name: "نورة العتيبي",
    role: "مديرة تسويق",
    text: "المساعد الذكي ريكس يفهم السوق الخليجي بشكل ممتاز. اقتراحاته دقيقة جداً.",
    rating: 5,
  },
  {
    name: "محمد الزهراني",
    role: "مؤسس شركة ناشئة",
    text: "التصاميم التي يولدها الذكاء الاصطناعي احترافية جداً. وفّرت آلاف الريالات.",
    rating: 5,
  },
];

export default function Home() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div
      className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden"
      dir="rtl"
    >
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-yellow-900/20">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full gold-gradient-bg flex items-center justify-center pulse-gold">
              <Crown className="w-5 h-5 text-black" />
            </div>
            <span className="text-2xl font-black gold-gradient tracking-wider">
              REX-SHOP
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a
              href="#features"
              className="text-gray-300 hover:text-yellow-400 transition-colors"
            >
              المميزات
            </a>
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
              href="/assistant"
              className="text-gray-300 hover:text-yellow-400 transition-colors"
            >
              المساعد
            </Link>
            <Link
              href="/support"
              className="text-gray-300 hover:text-yellow-400 transition-colors"
            >
              الدعم
            </Link>
            <Link
              href="/updates"
              className="text-gray-300 hover:text-yellow-400 transition-colors"
            >
              التحديثات
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-yellow-900/30 animate-pulse" />
            ) : isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-sm hidden md:block">
                  {user?.name}
                </span>
                <Link href="/dashboard">
                  <button className="btn-gold px-4 py-2 rounded-xl text-sm font-bold">
                    لوحة التحكم
                  </button>
                </Link>
                <button
                  onClick={() => logout()}
                  className="text-gray-500 hover:text-red-400 text-sm transition-colors hidden md:block"
                >
                  خروج
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <a
                  href={getLoginUrl()}
                  className="text-gray-300 hover:text-white text-sm transition-colors hidden md:block"
                >
                  تسجيل الدخول
                </a>
                <a
                  href={getLoginUrl()}
                  className="btn-gold px-4 py-2 rounded-xl text-sm font-bold"
                >
                  ابدأ مجاناً
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 animated-bg opacity-60" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-yellow-600/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,215,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.3) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-yellow-900/20 border border-yellow-600/30 rounded-full px-5 py-2 mb-8"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-300 text-sm font-medium">
              منصة التسويق الرقمي الذكي #1 في الخليج
            </span>
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
          >
            <span className="shimmer-text">REX-SHOP</span>
            <br />
            <span className="text-white text-4xl md:text-5xl lg:text-6xl">
              منصة التسويق
            </span>
            <br />
            <span className="text-white text-4xl md:text-5xl lg:text-6xl">
              الرقمي الذكي
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            نمّي متجرك الإلكتروني بقوة الذكاء الاصطناعي. من SEO إلى التصميم
            الجرافيكي، كل ما تحتاجه في مكان واحد.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <a
              href={getLoginUrl()}
              className="btn-gold px-8 py-4 rounded-2xl font-black text-lg gold-glow flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5" />
              ابدأ مجاناً الآن
            </a>
            <Link href="/assistant">
              <button className="px-8 py-4 rounded-2xl border border-yellow-600/40 text-yellow-300 hover:bg-yellow-900/20 transition-all font-bold text-lg flex items-center justify-center gap-2">
                <Bot className="w-5 h-5" />
                تحدث مع ريكس
              </button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {[
              { value: "10K+", label: "متجر نشط" },
              { value: "9,000+", label: "تصميم ذكي" },
              { value: "98%", label: "رضا العملاء" },
              { value: "24/7", label: "دعم مستمر" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-black gold-gradient">
                  {stat.value}
                </div>
                <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-yellow-600/40 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-3 bg-yellow-500 rounded-full" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-yellow-500 text-sm font-bold uppercase tracking-widest">
              المميزات
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4">
              كل ما تحتاجه لـ
              <span className="gold-gradient"> نجاح متجرك</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              منصة متكاملة تجمع أدوات التسويق الرقمي بقوة الذكاء الاصطناعي
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="feature-card bg-[#111] rounded-2xl p-6"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-[#1a1a1a] flex items-center justify-center mb-4`}
                >
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-white font-black text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-yellow-500 text-sm font-bold uppercase tracking-widest">
                المساعد الذكي
              </span>
              <h2 className="text-4xl md:text-5xl font-black mt-3 mb-6">
                تعرّف على
                <span className="gold-gradient"> ريكس</span>
              </h2>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                مساعدك الشخصي الذكي الذي يتحدث العربية واللهجة الخليجية. يفهم
                السوق الخليجي ويقدم لك اقتراحات تسويقية دقيقة ومخصصة لمتجرك.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "يتحدث العربية واللهجة الخليجية",
                  "خبير في التسويق الرقمي والتجارة الإلكترونية",
                  "يقدم استراتيجيات مخصصة لمتجرك",
                  "متاح 24/7 بدون انتظار",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/assistant">
                <button className="btn-gold px-6 py-3 rounded-xl font-bold flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  تحدث مع ريكس الآن
                </button>
              </Link>
            </motion.div>

            {/* Chat Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#111] rounded-3xl p-6 border border-yellow-900/20 gold-glow"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-yellow-900/20">
                <div className="w-10 h-10 rounded-full gold-gradient-bg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-black" />
                </div>
                <div>
                  <div className="text-white font-bold">ريكس</div>
                  <div className="text-green-400 text-xs flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    متاح الآن
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full gold-gradient-bg flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-black" />
                  </div>
                  <div className="bg-[#1a1a1a] rounded-2xl rounded-tr-sm px-4 py-3 max-w-xs">
                    <p className="text-gray-200 text-sm">
                      مرحباً! أنا ريكس 👑 كيف أقدر أساعدك اليوم؟
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-blue-600 rounded-2xl rounded-tl-sm px-4 py-3 max-w-xs">
                    <p className="text-white text-sm">
                      أبي أزيد مبيعات متجري في سلة
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full gold-gradient-bg flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-black" />
                  </div>
                  <div className="bg-[#1a1a1a] rounded-2xl rounded-tr-sm px-4 py-3 max-w-xs">
                    <p className="text-gray-200 text-sm">
                      ممتاز! عندي لك خطة من 3 خطوات تزيد مبيعاتك خلال شهر
                      واحد...
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <div className="flex-1 bg-[#1a1a1a] rounded-xl px-4 py-3 text-gray-600 text-sm">
                  اسأل ريكس...
                </div>
                <button className="w-10 h-10 rounded-xl btn-gold flex items-center justify-center">
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-16 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-black text-white mb-3">
            يتكامل مع منصاتك المفضلة
          </h2>
          <p className="text-gray-500 mb-10">
            ربط مباشر مع أبرز منصات التجارة الإلكترونية والتسويق
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "سلة", emoji: "🛒" },
              { name: "زد", emoji: "🏪" },
              { name: "شوبيفاي", emoji: "💼" },
              { name: "ووكوميرس", emoji: "🌐" },
              { name: "Google Ads", emoji: "🔍" },
              { name: "Meta Ads", emoji: "📘" },
              { name: "Snapchat", emoji: "👻" },
              { name: "TikTok", emoji: "🎵" },
            ].map((platform, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-[#111] border border-yellow-900/20 hover:border-yellow-600/40 px-4 py-3 rounded-xl transition-all"
              >
                <span className="text-xl">{platform.emoji}</span>
                <span className="text-gray-300 font-medium">
                  {platform.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-yellow-500 text-sm font-bold uppercase tracking-widest">
              الأسعار
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4">
              اختر الخطة
              <span className="gold-gradient"> المناسبة لك</span>
            </h2>
            <p className="text-gray-400">ابدأ مجاناً، وسعّد عندما تنمو</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`bg-[#111] rounded-3xl p-8 border-2 relative ${plan.color} ${plan.popular ? "gold-glow" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="btn-gold px-4 py-1.5 rounded-full text-sm font-black">
                      الأكثر شعبية
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-black text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black gold-gradient">
                      {plan.price}
                    </span>
                    <span className="text-gray-500">ر.س / {plan.period}</span>
                  </div>
                </div>
                <div className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{f}</span>
                    </div>
                  ))}
                </div>
                <a
                  href={getLoginUrl()}
                  className={`block text-center py-3 rounded-xl font-bold transition-all ${plan.popular ? "btn-gold" : "border border-yellow-600/40 text-yellow-300 hover:bg-yellow-900/20"}`}
                >
                  {plan.cta}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-yellow-500 text-sm font-bold uppercase tracking-widest">
              آراء العملاء
            </span>
            <h2 className="text-4xl font-black mt-3">
              ماذا يقول
              <span className="gold-gradient"> عملاؤنا</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="feature-card bg-[#111] rounded-2xl p-6"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">"{t.text}"</p>
                <div>
                  <div className="text-white font-bold">{t.name}</div>
                  <div className="text-yellow-600 text-sm">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#111] rounded-3xl p-12 border border-yellow-900/30 gold-glow"
          >
            <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              جاهز لتنمية
              <span className="gold-gradient"> متجرك؟</span>
            </h2>
            <p className="text-gray-400 text-xl mb-8">
              انضم لآلاف التجار الذين يستخدمون REX-SHOP لتحقيق نتائج استثنائية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={getLoginUrl()}
                className="btn-gold px-8 py-4 rounded-2xl font-black text-lg gold-glow flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                ابدأ مجاناً الآن
              </a>
              <Link href="/support">
                <button className="px-8 py-4 rounded-2xl border border-yellow-600/40 text-yellow-300 hover:bg-yellow-900/20 transition-all font-bold text-lg">
                  تواصل معنا
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#080808] border-t border-yellow-900/20 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full gold-gradient-bg flex items-center justify-center">
                  <Crown className="w-5 h-5 text-black" />
                </div>
                <span className="text-2xl font-black gold-gradient">
                  REX-SHOP
                </span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                منصة التسويق الرقمي الذكي الرائدة في الخليج العربي. نمّي متجرك
                بقوة الذكاء الاصطناعي.
              </p>
              <div className="flex gap-3">
                <a
                  href="mailto:nrjseah00@gmail.com"
                  className="text-gray-600 hover:text-yellow-500 transition-colors text-sm"
                >
                  nrjseah00@gmail.com
                </a>
              </div>
              <div className="mt-2">
                <a
                  href="https://wa.me/966508047159"
                  className="text-gray-600 hover:text-green-400 transition-colors text-sm"
                >
                  واتساب: 0508047159
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-bold mb-4">الخدمات</h4>
              <div className="space-y-2">
                {[
                  "تحسين SEO",
                  "Google Ads",
                  "التصميم الجرافيكي",
                  "إدارة السوشيال",
                  "التسويق بالبريد",
                ].map((l, i) => (
                  <Link key={i} href="/services">
                    <div className="text-gray-500 hover:text-yellow-400 text-sm transition-colors cursor-pointer">
                      {l}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">المنصة</h4>
              <div className="space-y-2">
                {[
                  { label: "الحملات الإعلانية", href: "/campaigns" },
                  { label: "التصميم الذكي", href: "/design" },
                  { label: "المساعد ريكس", href: "/assistant" },
                  { label: "الدعم الفني", href: "/support" },
                  { label: "التحديثات", href: "/updates" },
                ].map((l, i) => (
                  <Link key={i} href={l.href}>
                    <div className="text-gray-500 hover:text-yellow-400 text-sm transition-colors cursor-pointer">
                      {l.label}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-yellow-900/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()}{" "}
              <span className="text-yellow-600 font-bold">REX-SHOP™</span>.
              جميع الحقوق محفوظة. منصة REX-SHOP للتسويق الرقمي الذكي.
            </p>
            <div className="flex items-center gap-2 text-gray-700 text-xs">
              <Shield className="w-3 h-3" />
              <span>
                حقوق الملكية الفكرية محفوظة لـ REX-SHOP™ 2024-
                {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
