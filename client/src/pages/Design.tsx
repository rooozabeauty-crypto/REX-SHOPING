import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import {
  Palette,
  Sparkles,
  Crown,
  Wand2,
  Image,
  Type,
  Layers,
  Download,
  RefreshCw,
  Lock,
  CheckCircle,
  Zap,
  Copy,
  Share2,
  Trash2,
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

export default function Design() {
  const { isAuthenticated, user } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("modern");
  const [selectedCategory, setSelectedCategory] = useState("logo");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<
    Array<{
      id: string;
      url: string;
      prompt: string;
      style: string;
      timestamp: Date;
    }>
  >([]);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  const generateDesign = trpc.design.generate.useMutation({});

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("الرجاء إدخال وصف التصميم");
      return;
    }
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }

    setIsGenerating(true);
    generateDesign.mutate(
      {
        prompt,
        style: selectedStyle,
        category: selectedCategory,
      },
      {
        onSuccess: data => {
          const newImage = {
            id: Math.random().toString(36).substr(2, 9),
            url: data.imageUrl ?? "",
            prompt,
            style: selectedStyle,
            timestamp: new Date(),
          };
          setGeneratedImages([newImage, ...generatedImages]);
          setSelectedImageId(newImage.id);
          setIsGenerating(false);
          toast.success("✨ تم توليد التصميم بنجاح!");
        },
        onError: () => {
          setIsGenerating(false);
          toast.error("حدث خطأ أثناء توليد التصميم");
        },
      }
    );
  };

  const handleDownload = (imageUrl: string) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `rex-shop-design-${Date.now()}.png`;
    link.click();
    toast.success("تم تحميل التصميم!");
  };

  const handleCopyUrl = (imageUrl: string) => {
    navigator.clipboard.writeText(imageUrl);
    toast.success("تم نسخ الرابط!");
  };

  const handleDelete = (id: string) => {
    setGeneratedImages(generatedImages.filter(img => img.id !== id));
    if (selectedImageId === id) {
      setSelectedImageId(
        generatedImages.length > 1 ? generatedImages[0].id : null
      );
    }
    toast.success("تم حذف التصميم");
  };

  const selectedImage = generatedImages.find(img => img.id === selectedImageId);

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
            <Link href="/design" className="text-blue-400 font-bold">
              التصميم
            </Link>
            <Link
              href="/campaigns"
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
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
              "radial-gradient(ellipse at center, #1a1a4e 0%, #080810 70%)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-900/30 border border-blue-500/30 rounded-full px-4 py-2 mb-8"
          >
            <Palette className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm">
              أكثر من 9,000 اقتراح تصميمي بالذكاء الاصطناعي
            </span>
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

      {/* Main Content */}
      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Generator Panel */}
            <div className="lg:col-span-1">
              <div className="bg-[#0d0d18] rounded-3xl border border-blue-900/30 p-6 blue-glow sticky top-24">
                <div className="flex items-center gap-3 mb-6">
                  <Wand2 className="w-6 h-6 text-blue-400" />
                  <h2 className="text-xl font-black text-white">
                    مولّد التصاميم
                  </h2>
                </div>

                {/* Category Selection */}
                <div className="mb-5">
                  <label className="text-gray-400 text-xs mb-2 block font-bold">
                    نوع التصميم
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {designCategories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`p-2 rounded-lg text-center transition-all text-xs ${selectedCategory === cat.id ? "bg-blue-600 border-blue-500" : "bg-[#111] border-gray-800 hover:border-blue-700"} border`}
                      >
                        <div className="text-lg mb-0.5">{cat.icon}</div>
                        <div className="font-medium">{cat.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Style Selection */}
                <div className="mb-5">
                  <label className="text-gray-400 text-xs mb-2 block font-bold">
                    الأسلوب
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {designStyles.map(style => (
                      <button
                        key={style.id}
                        onClick={() => setSelectedStyle(style.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs transition-all ${selectedStyle === style.id ? "bg-blue-600 text-white" : "bg-[#111] text-gray-400 border border-gray-800 hover:border-blue-700"}`}
                      >
                        {style.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prompt Input */}
                <div className="mb-5">
                  <label className="text-gray-400 text-xs mb-2 block font-bold">
                    صف تصميمك
                  </label>
                  <textarea
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    placeholder="مثال: شعار لمتجر ملابس فاخر باللون الذهبي والأسود..."
                    className="w-full bg-[#111] border border-gray-800 rounded-lg p-3 text-white placeholder-gray-600 resize-none h-24 focus:outline-none focus:border-blue-500 transition-colors text-xs"
                    dir="rtl"
                  />
                  <div className="text-gray-600 text-xs mt-1">
                    {prompt.length}/500
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !isAuthenticated}
                  className="w-full py-3 rounded-lg font-black text-sm transition-all flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      جاري التوليد...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      توليد الآن
                    </>
                  )}
                </button>

                {!isAuthenticated && (
                  <a
                    href={getLoginUrl()}
                    className="block w-full mt-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white text-center text-sm font-bold transition-colors"
                  >
                    سجّل دخول أولاً
                  </a>
                )}

                {/* History */}
                {generatedImages.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-800">
                    <h3 className="text-gray-400 text-xs font-bold mb-3">
                      السجل ({generatedImages.length})
                    </h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {generatedImages.map(img => (
                        <button
                          key={img.id}
                          onClick={() => setSelectedImageId(img.id)}
                          className={`w-full p-2 rounded-lg text-left text-xs transition-all ${selectedImageId === img.id ? "bg-blue-600/30 border border-blue-500" : "bg-[#111] border border-gray-800 hover:border-blue-700"}`}
                        >
                          <div className="font-medium text-white truncate">
                            {img.prompt.substring(0, 20)}...
                          </div>
                          <div className="text-gray-500 text-xs">
                            {img.style}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Preview Panel */}
            <div className="lg:col-span-2">
              {selectedImage ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#0d0d18] rounded-3xl border border-blue-900/30 p-6 blue-glow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <h3 className="text-white font-bold">تصميمك جاهز!</h3>
                    </div>
                    <button
                      onClick={() => handleDelete(selectedImage.id)}
                      className="p-2 rounded-lg bg-red-900/20 hover:bg-red-900/40 text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Image Display */}
                  <div className="bg-[#111] rounded-2xl p-4 mb-6 flex items-center justify-center min-h-96">
                    <img
                      src={selectedImage.url}
                      alt="Generated Design"
                      className="w-full h-auto rounded-lg max-h-96 object-contain"
                    />
                  </div>

                  {/* Design Info */}
                  <div className="bg-[#111] rounded-xl p-4 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-gray-500 text-xs mb-1">الوصف</div>
                        <div className="text-white text-sm font-medium">
                          {selectedImage.prompt}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs mb-1">
                          الأسلوب
                        </div>
                        <div className="text-white text-sm font-medium capitalize">
                          {selectedImage.style}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => handleDownload(selectedImage.url)}
                      className="py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline">تحميل</span>
                    </button>
                    <button
                      onClick={() => handleCopyUrl(selectedImage.url)}
                      className="py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      <span className="hidden sm:inline">نسخ</span>
                    </button>
                    <button
                      onClick={() => {
                        navigator.share?.({
                          url: selectedImage.url,
                          title: "تصميمي من REX-SHOP",
                        });
                        !navigator.share && toast.info("تم نسخ الرابط");
                      }}
                      className="py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      <span className="hidden sm:inline">مشاركة</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-[#0d0d18] rounded-3xl border border-blue-900/30 p-12 blue-glow flex flex-col items-center justify-center min-h-96">
                  <Image className="w-16 h-16 text-gray-700 mb-4" />
                  <h3 className="text-white font-bold text-lg mb-2">
                    لا توجد تصاميم بعد
                  </h3>
                  <p className="text-gray-500 text-center">
                    ابدأ بإدخال وصف تصميمك على اليسار واضغط "توليد الآن"
                  </p>
                </div>
              )}
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
