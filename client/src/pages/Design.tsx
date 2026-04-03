import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import {
  Palette, Sparkles, Crown, Wand2, Image, Type,
  Layers, Download, RefreshCw, Lock, CheckCircle, Zap
} from "lucide-react";
import { toast } from "sonner";

const designStyles = [
  { id: "modern", label: "عصري", emoji: "✨" },
  { id: "classic", label: "كلاسيكي", emoji: "🏛️" },
  { id: "minimalist", label: "بسيط", emoji: "⬜" },
  { id: "bold", label: "جريء", emoji: "💪" },
  { id: "elegant", label: "أنيق", emoji: "💎" },
  { id: "playful", label: "مرح", emoji: "🎨" },
  { id: "tech", label: "تقني", emoji: "🤖" },
  { id: "arabic", label: "عربي أصيل", emoji: "🌙" },
];

const designCategories = [
  { id: "logo", label: "شعار", icon: "🎯", count: "2,400+" },
  { id: "brand", label: "هوية بصرية", icon: "🎨", count: "1,800+" },
  { id: "social", label: "منشورات سوشيال", icon: "📱", count: "3,200+" },
  { id: "banner", label: "بانر إعلاني", icon: "🖼️", count: "1,600+" },
  { id: "card", label: "بطاقة أعمال", icon: "💳", count: "900+" },
  { id: "poster", label: "بوستر", icon: "📋", count: "1,100+" },
];

const sampleDesigns = [
  { emoji: "🏆", title: "شعار ذهبي فاخر", style: "أنيق" },
  { emoji: "🌟", title: "هوية بصرية عصرية", style: "عصري" },
  { emoji: "💎", title: "شعار مجوهرات", style: "كلاسيكي" },
  { emoji: "🚀", title: "هوية شركة تقنية", style: "تقني" },
  { emoji: "🌙", title: "شعار عربي أصيل", style: "عربي" },
  { emoji: "🎯", title: "بانر إعلاني", style: "جريء" },
];

export default function Design() {
  const { isAuthenticated } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("modern");
  const [selectedCategory, setSelectedCategory] = useState("logo");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const generateDesign = trpc.design.generate.useMutation({});

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error("الرجاء إدخال وصف التصميم");
      return;
    }
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    setIsGenerating(true);
    generateDesign.mutate({
      prompt,
      style: selectedStyle,
      category: selectedCategory,
    }, {
      onSuccess: (data) => {
        setGeneratedImage(data.imageUrl ?? null);
        setIsGenerating(false);
        toast.success("تم توليد التصميم بنجاح!");
      },
      onError: () => {
        setIsGenerating(false);
        toast.error("حدث خطأ أثناء توليد التصميم");
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#080810] text-white" dir="rtl">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#080810]/95 backdrop-blur-md border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <Crown className="w-8 h-8 text-yellow-500" />
              <span className="text-xl font-black gold-gradient">REX-SHOP</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/" className="text-gray-300 hover:text-blue-400 transition-colors">الرئيسية</Link>
            <Link href="/services" className="text-gray-300 hover:text-blue-400 transition-colors">الخدمات</Link>
            <Link href="/design" className="text-blue-400 font-bold">التصميم</Link>
            <Link href="/campaigns" className="text-gray-300 hover:text-blue-400 transition-colors">الحملات</Link>
            <Link href="/support" className="text-gray-300 hover:text-blue-400 transition-colors">الدعم</Link>
          </div>
          <div>
            {isAuthenticated ? (
              <Link href="/dashboard">
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-bold transition-colors">لوحة التحكم</button>
              </Link>
            ) : (
              <a href={getLoginUrl()} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-bold transition-colors">ابدأ مجاناً</a>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ background: "radial-gradient(ellipse at center, #1a1a4e 0%, #080810 70%)" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-900/30 border border-blue-500/30 rounded-full px-4 py-2 mb-8"
          >
            <Palette className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm">أكثر من 9,000 اقتراح تصميمي بالذكاء الاصطناعي</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-black mb-6"
          >
            <span className="text-white">التصميم الجرافيكي</span>
            <br />
            <span style={{ color: "#4fc3f7" }}>بالذكاء الاصطناعي</span>
          </motion.h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            أنشئ شعارات وهويات بصرية وتصاميم احترافية في ثوانٍ معدودة
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-[#0d0d18]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "9,000+", label: "اقتراح تصميمي" },
              { value: "50K+", label: "تصميم مُنجز" },
              { value: "< 30s", label: "وقت التوليد" },
              { value: "100%", label: "ملكية كاملة" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-black" style={{ color: "#4fc3f7" }}>{s.value}</div>
                <div className="text-gray-500 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Generator */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-[#0d0d18] rounded-3xl border border-blue-900/30 p-8 blue-glow">
            <div className="flex items-center gap-3 mb-8">
              <Wand2 className="w-8 h-8 text-blue-400" />
              <h2 className="text-2xl font-black text-white">مولّد التصاميم الذكي</h2>
              <span className="bg-blue-600/20 text-blue-400 text-xs px-2 py-1 rounded-full border border-blue-600/30">AI</span>
            </div>

            {/* Category Selection */}
            <div className="mb-6">
              <label className="text-gray-400 text-sm mb-3 block">نوع التصميم</label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {designCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-3 rounded-xl text-center transition-all ${selectedCategory === cat.id ? "bg-blue-600 border-blue-500" : "bg-[#111] border-gray-800 hover:border-blue-700"} border`}
                  >
                    <div className="text-2xl mb-1">{cat.icon}</div>
                    <div className="text-xs text-white font-medium">{cat.label}</div>
                    <div className="text-xs text-gray-500">{cat.count}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Style Selection */}
            <div className="mb-6">
              <label className="text-gray-400 text-sm mb-3 block">الأسلوب</label>
              <div className="flex flex-wrap gap-2">
                {designStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`px-4 py-2 rounded-xl text-sm transition-all flex items-center gap-2 ${selectedStyle === style.id ? "bg-blue-600 text-white" : "bg-[#111] text-gray-400 border border-gray-800 hover:border-blue-700"}`}
                  >
                    <span>{style.emoji}</span>
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Input */}
            <div className="mb-6">
              <label className="text-gray-400 text-sm mb-3 block">صف تصميمك</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="مثال: شعار لمتجر ملابس فاخر باللون الذهبي والأسود، اسم المتجر 'الفخامة'، أسلوب عصري وأنيق..."
                className="w-full bg-[#111] border border-gray-800 rounded-xl p-4 text-white placeholder-gray-600 resize-none h-28 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                dir="rtl"
              />
              <div className="flex justify-between mt-2">
                <span className="text-gray-600 text-xs">{prompt.length}/500 حرف</span>
                <button
                  onClick={() => setPrompt("شعار لمتجر إلكتروني فاخر باللون الذهبي والأسود، اسم المتجر REX-SHOP، أسلوب عصري وأنيق مع تاج ملكي")}
                  className="text-blue-400 text-xs hover:text-blue-300 transition-colors"
                >
                  جرّب مثالاً
                </button>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-4 rounded-xl font-black text-lg transition-all flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  جاري التوليد...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  توليد التصميم الآن
                </>
              )}
            </button>

            {/* Generated Result */}
            {generatedImage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 bg-[#111] rounded-2xl p-6 border border-blue-900/30"
              >
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  تصميمك جاهز!
                </h3>
                <img src={generatedImage} alt="Generated Design" className="w-full rounded-xl mb-4" />
                <div className="flex gap-3">
                  <a
                    href={generatedImage}
                    download="rex-shop-design.png"
                    className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-center font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    تحميل التصميم
                  </a>
                  <button
                    onClick={handleGenerate}
                    className="px-4 py-3 rounded-xl border border-gray-700 text-gray-400 hover:border-blue-600 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Sample Gallery */}
      <section className="py-16 bg-[#0d0d18]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-4">
              أمثلة من <span style={{ color: "#4fc3f7" }}>تصاميمنا</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {sampleDesigns.map((design, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="service-card bg-[#111] rounded-2xl p-8 text-center cursor-pointer"
              >
                <div className="text-6xl mb-4">{design.emoji}</div>
                <h3 className="text-white font-bold mb-1">{design.title}</h3>
                <span className="text-xs text-blue-400 bg-blue-900/20 px-2 py-1 rounded-full">{design.style}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Notice */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-[#0d0d18] rounded-3xl p-8 border border-yellow-900/30 text-center">
            <Lock className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-white mb-3">
              احصل على وصول كامل لـ <span className="gold-gradient">9,000+ تصميم</span>
            </h2>
            <p className="text-gray-400 mb-6">
              الخطة المجانية تتيح 5 تصاميم شهرياً. اشترك للحصول على وصول غير محدود لجميع الأنماط والأساليب
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={getLoginUrl()} className="btn-gold px-6 py-3 rounded-xl font-bold inline-block">
                ابدأ التجربة المجانية
              </a>
              <Link href="/services">
                <button className="px-6 py-3 rounded-xl border border-yellow-600/40 text-yellow-300 hover:bg-yellow-900/20 transition-all font-bold">
                  عرض الأسعار
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
            © {new Date().getFullYear()} REX-SHOP. جميع الحقوق محفوظة لـ REX-SHOP™
          </p>
        </div>
      </footer>
    </div>
  );
}
