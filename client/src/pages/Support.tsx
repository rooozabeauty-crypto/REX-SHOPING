import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import {
  Crown, Mail, MessageSquare, Phone, Star, Send,
  CheckCircle, HelpCircle, Clock, Zap, Heart, X,
  MessageCircle, AlertCircle, Smile
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

type ChatMessage = {
  id: string;
  type: "user" | "support";
  message: string;
  timestamp: Date;
};

export default function Support() {
  const { isAuthenticated } = useAuth();
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "support",
      message: "مرحباً! 👋 أنا فريق دعم REX-SHOP. كيف يمكنني مساعدتك؟",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

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
      setFormData({ name: "", email: "", message: "", rating: 5, type: "support" });
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

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(36),
      type: "user",
      message: inputMessage,
      timestamp: new Date(),
    };

    setChatMessages([...chatMessages, userMsg]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate support response
    setTimeout(() => {
      const responses = [
        "شكراً على رسالتك! 😊 سأساعدك بأسرع وقت ممكن.",
        "هذا سؤال رائع! دعني أتحقق من هذا لك.",
        "نحن هنا لمساعدتك 24/7. ما الذي تحتاجه بالضبط؟",
        "شكراً لاختيارك REX-SHOP! 👑 كيف يمكنني تحسين خدمتنا؟",
        "رسالتك مهمة لنا جداً. سيتواصل معك فريقنا قريباً.",
      ];

      const supportMsg: ChatMessage = {
        id: Math.random().toString(36),
        type: "support",
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setChatMessages(prev => [...prev, supportMsg]);
      setIsTyping(false);
    }, 1500);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" dir="rtl">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-yellow-900/20">
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
            <span className="text-yellow-300 text-sm">دعم 24/7 من فريق REX-SHOP</span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            <span className="text-white">مركز الدعم</span>
            <br />
            <span className="gold-gradient">والتواصل</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            نحن هنا لمساعدتك في كل خطوة من رحلتك مع REX-SHOP
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Mail, label: "البريد الإلكتروني", value: "nrjseah00@gmail.com", color: "text-blue-400", bg: "bg-blue-900/20" },
              { icon: Phone, label: "واتساب", value: "0508047159", color: "text-green-400", bg: "bg-green-900/20" },
              { icon: MessageCircle, label: "الدردشة المباشرة", value: "متاح الآن", color: "text-purple-400", bg: "bg-purple-900/20" },
            ].map((method, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="feature-card bg-[#111] rounded-2xl p-6"
              >
                <div className={`w-12 h-12 rounded-xl ${method.bg} flex items-center justify-center mb-4`}>
                  <method.icon className={`w-6 h-6 ${method.color}`} />
                </div>
                <h3 className="text-white font-bold mb-2">{method.label}</h3>
                <p className="text-gray-400 text-sm mb-4">{method.value}</p>
                {method.label === "الدردشة المباشرة" && (
                  <button
                    onClick={() => setShowLiveChat(true)}
                    className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold transition-colors"
                  >
                    ابدأ الدردشة
                  </button>
                )}
                {method.label === "البريد الإلكتروني" && (
                  <a
                    href={`mailto:${method.value}`}
                    className="block w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors text-center"
                  >
                    أرسل بريد
                  </a>
                )}
                {method.label === "واتساب" && (
                  <a
                    href={`https://wa.me/966508047159`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-bold transition-colors text-center"
                  >
                    تواصل الآن
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-[#0d0d0d]">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-3 flex items-center justify-center gap-2">
              <HelpCircle className="w-8 h-8 text-yellow-500" />
              أسئلة شائعة
            </h2>
            <p className="text-gray-500">إجابات على أكثر الأسئلة التي نتلقاها</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="feature-card bg-[#111] rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full p-6 flex items-center justify-between hover:bg-[#1a1a1a] transition-colors"
                >
                  <h3 className="text-white font-bold text-left">{faq.q}</h3>
                  <motion.div
                    animate={{ rotate: expandedFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-yellow-500" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {expandedFaq === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 border-t border-gray-800"
                    >
                      <p className="text-gray-400">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feedback Form */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-[#111] rounded-2xl p-8 border border-yellow-900/20">
            <h2 className="text-2xl font-black text-white mb-2 flex items-center gap-2">
              <Smile className="w-6 h-6 text-yellow-500" />
              شارك رأيك معنا
            </h2>
            <p className="text-gray-500 mb-6">آراؤك مهمة جداً لنا وتساعدنا على التحسن</p>

            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">شكراً لك!</h3>
                <p className="text-gray-400 mb-6">تم استقبال رسالتك بنجاح</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-gold px-6 py-2 rounded-lg font-bold"
                >
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">الاسم *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-600 text-sm"
                      placeholder="اسمك"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">البريد الإلكتروني</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-600 text-sm"
                      placeholder="بريدك"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 text-sm mb-2 block">نوع الرسالة</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { id: "review", label: "تقييم" },
                      { id: "suggestion", label: "اقتراح" },
                      { id: "complaint", label: "شكوى" },
                      { id: "support", label: "دعم" },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, type: t.id as typeof formData.type })}
                        className={`py-2 rounded-lg text-sm transition-all ${formData.type === t.id ? "btn-gold" : "bg-[#1a1a1a] text-gray-400 border border-gray-800"}`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 text-sm mb-2 block">التقييم (اختياري)</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: r })}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-6 h-6 ${formData.rating >= r ? "text-yellow-500 fill-yellow-500" : "text-gray-700"}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 text-sm mb-2 block">الرسالة *</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="أخبرنا برأيك..."
                    className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 resize-none h-32 focus:outline-none focus:border-yellow-600 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitFeedback.isPending}
                  className="w-full btn-gold py-3 rounded-lg font-bold disabled:opacity-50"
                >
                  {submitFeedback.isPending ? "جاري الإرسال..." : "إرسال الرسالة"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Live Chat Widget */}
      <AnimatePresence>
        {showLiveChat && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-24px)] bg-[#0a0a0a] rounded-2xl border border-yellow-900/30 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <div>
                  <h3 className="text-white font-bold text-sm">دعم REX-SHOP</h3>
                  <p className="text-yellow-100 text-xs">متاح الآن</p>
                </div>
              </div>
              <button
                onClick={() => setShowLiveChat(false)}
                className="p-1 hover:bg-yellow-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-96 bg-[#0d0d0d]">
              {chatMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg text-sm ${msg.type === "user"
                      ? "bg-yellow-600 text-white"
                      : "bg-[#1a1a1a] text-gray-300 border border-gray-800"
                      }`}
                  >
                    {msg.message}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-600 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-gray-600 animate-bounce delay-100" />
                  <div className="w-2 h-2 rounded-full bg-gray-600 animate-bounce delay-200" />
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-800 flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="اكتب رسالتك..."
                className="flex-1 bg-[#1a1a1a] border border-gray-800 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-600"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 rounded-lg bg-yellow-600 hover:bg-yellow-700 text-white transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      {!showLiveChat && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => setShowLiveChat(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-700 text-white shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      )}

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

function ChevronDown(props: any) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  );
}
