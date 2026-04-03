import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import {
  Crown,
  Megaphone,
  FileText,
  Image,
  Video,
  Mail,
  Sparkles,
  RefreshCw,
  Copy,
  CheckCircle,
  Zap,
  Globe,
} from "lucide-react";
import { toast } from "sonner";

const campaignTypes = [
  {
    id: "text",
    label: "نص إعلاني",
    icon: FileText,
    desc: "إعلانات نصية احترافية لجوجل وسوشيال ميديا",
  },
  {
    id: "post",
    label: "بوست تسويقي",
    icon: Image,
    desc: "منشورات جذابة لإنستغرام وتويتر وسناب",
  },
  {
    id: "email",
    label: "بريد إلكتروني",
    icon: Mail,
    desc: "رسائل بريدية احترافية تزيد معدل الفتح",
  },
  {
    id: "seo",
    label: "محتوى SEO",
    icon: Globe,
    desc: "مقالات ومحتوى محسّن لمحركات البحث",
  },
];

const platforms = [
  { id: "instagram", label: "إنستغرام", emoji: "📸" },
  { id: "twitter", label: "تويتر/X", emoji: "🐦" },
  { id: "snapchat", label: "سناب شات", emoji: "👻" },
  { id: "tiktok", label: "تيك توك", emoji: "🎵" },
  { id: "facebook", label: "فيسبوك", emoji: "👥" },
  { id: "google", label: "جوجل", emoji: "🔍" },
];

const tones = [
  { id: "professional", label: "احترافي" },
  { id: "friendly", label: "ودي" },
  { id: "urgent", label: "عاجل" },
  { id: "luxury", label: "فاخر" },
  { id: "funny", label: "مرح" },
  { id: "inspirational", label: "ملهم" },
];

export default function Campaigns() {
  const { isAuthenticated } = useAuth();
  const [campaignType, setCampaignType] = useState("post");
  const [platform, setPlatform] = useState("instagram");
  const [tone, setTone] = useState("professional");
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [language, setLanguage] = useState("arabic");
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generateCampaign = trpc.campaigns.generate.useMutation({
    onSuccess: (data: { content: string }) => {
      setGeneratedContent(data.content);
      toast.success("تم توليد المحتوى بنجاح!");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء توليد المحتوى");
    },
  });

  const handleGenerate = () => {
    if (!productName.trim()) {
      toast.error("الرجاء إدخال اسم المنتج أو الخدمة");
      return;
    }
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    generateCampaign.mutate({
      type: campaignType as "text" | "post" | "email" | "seo",
      platform,
      tone,
      productName,
      productDesc,
      language,
    });
  };

  const handleCopy = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent);
      setCopied(true);
      toast.success("تم نسخ المحتوى!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0e] text-white" dir="rtl">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0e]/95 backdrop-blur-md border-b border-blue-900/30">
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
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              الرئيسية
            </Link>
            <Link
              href="/services"
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              الخدمات
            </Link>
            <Link
              href="/design"
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              التصميم
            </Link>
            <Link href="/campaigns" className="text-blue-400 font-bold">
              الحملات
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
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, #1a2a4e 0%, #0a0a0e 70%)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-900/30 border border-blue-500/30 rounded-full px-4 py-2 mb-8"
          >
            <Megaphone className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm">
              إنشاء حملات إعلانية احترافية بالذكاء الاصطناعي
            </span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            <span className="text-white">حملاتك الإعلانية</span>
            <br />
            <span style={{ color: "#4fc3f7" }}>في ثوانٍ معدودة</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            أنشئ نصوصاً وبوستات وبريداً إلكترونياً احترافياً بالعربية
            والإنجليزية
          </p>
        </div>
      </section>

      {/* Campaign Generator */}
      <section className="py-8 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Panel */}
            <div className="bg-[#0d0d18] rounded-3xl border border-blue-900/30 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-black text-white">
                  إعدادات الحملة
                </h2>
              </div>

              {/* Campaign Type */}
              <div className="mb-5">
                <label className="text-gray-400 text-sm mb-3 block">
                  نوع المحتوى
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {campaignTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setCampaignType(type.id)}
                      className={`p-3 rounded-xl text-right transition-all border ${campaignType === type.id ? "bg-blue-600/20 border-blue-500 text-white" : "bg-[#111] border-gray-800 text-gray-400 hover:border-blue-700"}`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <type.icon className="w-4 h-4" />
                        <span className="font-bold text-sm">{type.label}</span>
                      </div>
                      <p className="text-xs text-gray-500">{type.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Platform */}
              <div className="mb-5">
                <label className="text-gray-400 text-sm mb-3 block">
                  المنصة
                </label>
                <div className="flex flex-wrap gap-2">
                  {platforms.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setPlatform(p.id)}
                      className={`px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-1 ${platform === p.id ? "bg-blue-600 text-white" : "bg-[#111] text-gray-400 border border-gray-800 hover:border-blue-700"}`}
                    >
                      <span>{p.emoji}</span>
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tone */}
              <div className="mb-5">
                <label className="text-gray-400 text-sm mb-3 block">
                  نبرة المحتوى
                </label>
                <div className="flex flex-wrap gap-2">
                  {tones.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setTone(t.id)}
                      className={`px-3 py-2 rounded-lg text-sm transition-all ${tone === t.id ? "bg-blue-600 text-white" : "bg-[#111] text-gray-400 border border-gray-800 hover:border-blue-700"}`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language */}
              <div className="mb-5">
                <label className="text-gray-400 text-sm mb-3 block">
                  اللغة
                </label>
                <div className="flex gap-3">
                  {[
                    { id: "arabic", label: "العربية 🇸🇦" },
                    { id: "english", label: "الإنجليزية 🇬🇧" },
                    { id: "both", label: "كلاهما" },
                  ].map(l => (
                    <button
                      key={l.id}
                      onClick={() => setLanguage(l.id)}
                      className={`flex-1 py-2 rounded-lg text-sm transition-all ${language === l.id ? "bg-blue-600 text-white" : "bg-[#111] text-gray-400 border border-gray-800 hover:border-blue-700"}`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="mb-5">
                <label className="text-gray-400 text-sm mb-2 block">
                  اسم المنتج / الخدمة *
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={e => setProductName(e.target.value)}
                  placeholder="مثال: عطر الفخامة الملكي"
                  className="w-full bg-[#111] border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                />
              </div>
              <div className="mb-6">
                <label className="text-gray-400 text-sm mb-2 block">
                  وصف المنتج (اختياري)
                </label>
                <textarea
                  value={productDesc}
                  onChange={e => setProductDesc(e.target.value)}
                  placeholder="أضف تفاصيل إضافية عن المنتج أو الخدمة..."
                  className="w-full bg-[#111] border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 resize-none h-20 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={generateCampaign.isPending}
                className="w-full py-4 rounded-xl font-black text-lg bg-blue-600 hover:bg-blue-700 text-white transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {generateCampaign.isPending ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    جاري التوليد...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    توليد المحتوى الآن
                  </>
                )}
              </button>
            </div>

            {/* Output Panel */}
            <div className="bg-[#0d0d18] rounded-3xl border border-blue-900/30 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Megaphone className="w-6 h-6 text-blue-400" />
                  <h2 className="text-xl font-black text-white">
                    المحتوى المُولَّد
                  </h2>
                </div>
                {generatedContent && (
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#111] border border-gray-800 text-gray-400 hover:border-blue-600 text-sm transition-all"
                  >
                    {copied ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {copied ? "تم النسخ!" : "نسخ"}
                  </button>
                )}
              </div>

              {generatedContent ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#111] rounded-2xl p-6 border border-blue-900/20 min-h-64"
                >
                  <pre className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                    {generatedContent}
                  </pre>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center min-h-64 text-center">
                  <div className="w-20 h-20 rounded-full bg-blue-900/20 flex items-center justify-center mb-4">
                    <Sparkles className="w-10 h-10 text-blue-600" />
                  </div>
                  <p className="text-gray-500 text-lg font-medium">
                    محتواك سيظهر هنا
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    أدخل معلومات منتجك وانقر على توليد
                  </p>
                </div>
              )}

              {generatedContent && (
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={handleGenerate}
                    className="flex-1 py-3 rounded-xl border border-blue-600/40 text-blue-400 hover:bg-blue-900/20 text-sm font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    توليد نسخة أخرى
                  </button>
                  <Link href="/services">
                    <button className="px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-all">
                      نشر الآن
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-[#0d0d18]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-4">
              لماذا <span style={{ color: "#4fc3f7" }}>REX-SHOP</span> للحملات؟
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "⚡",
                title: "سرعة فائقة",
                desc: "توليد محتوى احترافي في أقل من 30 ثانية",
              },
              {
                icon: "🎯",
                title: "محتوى مستهدف",
                desc: "محتوى مخصص لجمهورك ومنصتك المحددة",
              },
              {
                icon: "🌍",
                title: "ثنائي اللغة",
                desc: "محتوى بالعربية والإنجليزية بنفس الجودة",
              },
              {
                icon: "🤖",
                title: "ذكاء اصطناعي متقدم",
                desc: "يفهم السوق الخليجي واللهجة المحلية",
              },
              {
                icon: "📊",
                title: "محسّن للتحويل",
                desc: "محتوى مصمم لزيادة معدلات النقر والشراء",
              },
              {
                icon: "🔄",
                title: "توليد غير محدود",
                desc: "أنشئ عشرات النسخ واختر الأفضل",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="service-card bg-[#111] rounded-2xl p-6 text-center"
              >
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="text-white font-bold mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#060608] border-t border-blue-900/20 py-8">
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
