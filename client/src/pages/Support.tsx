import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import {
  Crown, Mail, MessageSquare, Phone, Star, Send,
  CheckCircle, HelpCircle, Clock, Zap, Heart
} from "lucide-react";
import { toast } from "sonner";

const faqs = [
  { q: "كيف أبدأ مع REX-SHOP؟", a: "سجّل حساباً مجانياً وستحصل على 14 يوم تجريبي مجاني لجميع الخدمات. لا يلزم بطاقة ائتمانية." },
  { q: "هل يدعم REX-SHOP متجر سلة وزد؟", a: "نعم! نوفر تكاملاً مباشراً مع متجر سلة وزد وشوبيفاي وووكوميرس وغيرها من المنصات الرائدة." },
  { q: "هل المساعد الذكي يفهم اللهجة الخليجية؟", a: "بالتأكيد! مساعدنا ريكس متخصص في اللهجة الخليجية ويفهم السوق الخليجي بشكل ممتاز." },
  { q: "ما هي خيارات الدفع المتاحة؟", a: "نقبل جميع بطاقات الائتمان والمدى وأبل باي وسداد وتحويل بنكي." },
  { q: "هل يمكنني إلغاء الاشتراك في أي وقت؟", a: "نعم، يمكنك إلغاء اشتراكك في أي وقت دون أي رسوم إضافية." },
  { q: "كم يستغرق توليد التصاميم؟", a: "يستغرق توليد التصاميم بالذكاء الاصطناعي أقل من 30 ثانية في الغالب." },
];

export default function Support() {
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: 5,
    type: "support" as "review" | "suggestion" | "complaint" | "support",
  });
  const [submitted, setSubmitted] = useState(false);

  const submitFeedback = trpc.feedback.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء الإرسال. حاول مرة أخرى.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) {
      toast.error("الرجاء ملء جميع الحقول المطلوبة");
      return;
    }
    submitFeedback.mutate(formData);
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
            <Link href="/design" className="text-gray-300 hover:text-yellow-400 transition-colors">التصميم</Link>
            <Link href="/campaigns" className="text-gray-300 hover:text-yellow-400 transition-colors">الحملات</Link>
            <Link href="/support" className="text-yellow-400 font-bold">الدعم</Link>
            <Link href="/updates" className="text-gray-300 hover:text-yellow-400 transition-colors">التحديثات</Link>
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
        <div className="absolute inset-0 animated-bg opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-yellow-900/30 border border-yellow-600/40 rounded-full px-4 py-2 mb-8"
          >
            <Heart className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-300 text-sm">نحن هنا لمساعدتك دائماً</span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            <span className="gold-gradient">الدعم والتواصل</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            فريقنا متاح على مدار الساعة لمساعدتك في تحقيق أهدافك التسويقية
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-8 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {/* Email */}
            <motion.a
              href="mailto:nrjseah00@gmail.com"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="feature-card bg-[#111] rounded-2xl p-8 text-center block"
            >
              <div className="w-16 h-16 rounded-2xl gold-gradient-bg flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-black text-white mb-2">البريد الإلكتروني</h3>
              <p className="text-yellow-400 font-bold mb-2">nrjseah00@gmail.com</p>
              <p className="text-gray-500 text-sm">نرد خلال 24 ساعة</p>
              <div className="mt-4 flex items-center justify-center gap-2 text-green-400 text-sm">
                <Clock className="w-4 h-4" />
                متاح 24/7
              </div>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/966508047159"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="feature-card bg-[#111] rounded-2xl p-8 text-center block"
            >
              <div className="w-16 h-16 rounded-2xl bg-green-600 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-white mb-2">واتساب</h3>
              <p className="text-green-400 font-bold mb-2">0508047159</p>
              <p className="text-gray-500 text-sm">رد فوري عبر الواتساب</p>
              <div className="mt-4 flex items-center justify-center gap-2 text-green-400 text-sm">
                <Zap className="w-4 h-4" />
                رد سريع
              </div>
            </motion.a>

            {/* AI Assistant */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="feature-card bg-[#111] rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-white mb-2">المساعد الذكي</h3>
              <p className="text-blue-400 font-bold mb-2">ريكس - مساعدك الخليجي</p>
              <p className="text-gray-500 text-sm">يجيب على استفساراتك فوراً</p>
              <div className="mt-4">
                <Link href="/assistant">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                    تحدث مع ريكس
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Contact Form & FAQ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-[#111] rounded-3xl border border-yellow-900/20 p-8">
              <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                <Send className="w-6 h-6 text-yellow-500" />
                أرسل لنا رسالة
              </h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-black text-white mb-2">تم الإرسال بنجاح!</h3>
                  <p className="text-gray-400">سنتواصل معك في أقرب وقت ممكن</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 btn-gold px-6 py-2 rounded-lg text-sm font-bold"
                  >
                    إرسال رسالة أخرى
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Type */}
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">نوع الرسالة</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: "support", label: "دعم فني" },
                        { id: "review", label: "تقييم" },
                        { id: "suggestion", label: "اقتراح" },
                        { id: "complaint", label: "شكوى" },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, type: t.id as typeof formData.type }))}
                          className={`py-2 rounded-lg text-sm transition-all ${formData.type === t.id ? "btn-gold" : "bg-[#1a1a1a] text-gray-400 border border-gray-800 hover:border-yellow-700"}`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">الاسم *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="اسمك الكريم"
                      className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-600 transition-colors text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">البريد الإلكتروني</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="بريدك الإلكتروني"
                      className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-600 transition-colors text-sm"
                    />
                  </div>

                  {/* Rating */}
                  {formData.type === "review" && (
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">التقييم</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                            className="transition-transform hover:scale-110"
                          >
                            <Star
                              className={`w-8 h-8 ${star <= formData.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-700"}`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">رسالتك *</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="اكتب رسالتك هنا..."
                      className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 resize-none h-32 focus:outline-none focus:border-yellow-600 transition-colors text-sm"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitFeedback.isPending}
                    className="w-full btn-gold py-4 rounded-xl font-black text-lg flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submitFeedback.isPending ? "جاري الإرسال..." : (
                      <>
                        <Send className="w-5 h-5" />
                        إرسال الرسالة
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-yellow-500" />
                الأسئلة الشائعة
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="bg-[#111] rounded-2xl p-5 border border-yellow-900/10 hover:border-yellow-900/30 transition-colors"
                  >
                    <h3 className="text-white font-bold mb-2 flex items-start gap-2">
                      <span className="text-yellow-500 mt-0.5">Q</span>
                      {faq.q}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed pr-5">{faq.a}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
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
