import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Crown, Send, Bot, User, Sparkles, RefreshCw, MessageSquare } from "lucide-react";
import { Streamdown } from "streamdown";
import { nanoid } from "nanoid";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const quickQuestions = [
  "كيف أحسّن ظهور متجري في جوجل؟",
  "ما هي أفضل استراتيجية للتسويق عبر سناب شات؟",
  "كيف أربط متجر سلة بـ REX-SHOP؟",
  "اقترح لي خطة تسويقية لمتجر ملابس",
  "ما هو الفرق بين SEO و Google Ads؟",
  "كيف أزيد مبيعاتي خلال رمضان؟",
];

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `مرحباً! أنا **ريكس**، مساعدك الذكي من REX-SHOP 👑

أنا هنا عشان أساعدك في كل شي يخص التسويق الرقمي والتجارة الإلكترونية.

سواء كنت تبي تحسّن ظهور متجرك في جوجل، تدير حساباتك على السوشيال ميديا، أو تبي خطة تسويقية متكاملة - أنا موجود!

**شو تبي تعرف اليوم؟** 🚀`,
    },
  ]);
  const [input, setInput] = useState("");
  const [sessionId] = useState(() => nanoid());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = trpc.assistant.chat.useMutation({
    onSuccess: (data) => {
      setMessages(prev => [...prev, {
        id: nanoid(),
        role: "assistant",
        content: data.message,
      }]);
    },
    onError: () => {
      setMessages(prev => [...prev, {
        id: nanoid(),
        role: "assistant",
        content: "عذراً، حدث خطأ. حاول مرة ثانية يا بطل! 🙏",
      }]);
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || sendMessage.isPending) return;

    const userMessage: Message = {
      id: nanoid(),
      role: "user",
      content: messageText,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    const history = messages.slice(-10).map(m => ({
      role: m.role,
      content: m.content,
    }));

    sendMessage.mutate({
      message: messageText,
      sessionId,
      history,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col" dir="rtl">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-yellow-900/20">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <Crown className="w-8 h-8 text-yellow-500" />
              <span className="text-xl font-black gold-gradient">REX-SHOP</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-yellow-900/20 border border-yellow-600/30 rounded-full px-3 py-1">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-yellow-300 text-sm font-medium">ريكس متاح الآن</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Chat Area */}
      <div className="flex-1 pt-16 flex flex-col max-w-4xl mx-auto w-full px-4">
        {/* Header */}
        <div className="py-6 text-center border-b border-yellow-900/20">
          <div className="w-16 h-16 rounded-full gold-gradient-bg flex items-center justify-center mx-auto mb-3 pulse-gold">
            <Bot className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-2xl font-black gold-gradient">ريكس - مساعدك الذكي</h1>
          <p className="text-gray-500 text-sm mt-1">خبير التسويق الرقمي الخليجي</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-6 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {/* Avatar */}
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === "assistant" ? "gold-gradient-bg" : "bg-blue-600"}`}>
                  {message.role === "assistant"
                    ? <Bot className="w-5 h-5 text-black" />
                    : <User className="w-5 h-5 text-white" />
                  }
                </div>

                {/* Bubble */}
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === "assistant"
                    ? "bg-[#111] border border-yellow-900/20 text-gray-200"
                    : "bg-blue-600 text-white"
                }`}>
                  {message.role === "assistant" ? (
                    <Streamdown className="text-sm leading-relaxed [&_strong]:text-yellow-400 [&_a]:text-blue-400">
                      {message.content}
                    </Streamdown>
                  ) : (
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading indicator */}
          {sendMessage.isPending && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="w-9 h-9 rounded-full gold-gradient-bg flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-black" />
              </div>
              <div className="bg-[#111] border border-yellow-900/20 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-yellow-500"
                      style={{ animation: `bounce 1s infinite ${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length <= 1 && (
          <div className="pb-4">
            <p className="text-gray-600 text-xs mb-3 text-center">أسئلة شائعة</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="text-xs bg-[#111] border border-yellow-900/20 hover:border-yellow-600/40 text-gray-300 hover:text-yellow-300 px-3 py-2 rounded-full transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="py-4 border-t border-yellow-900/20">
          <div className="flex gap-3">
            <div className="flex-1 bg-[#111] border border-yellow-900/30 rounded-2xl flex items-end gap-2 px-4 py-3 focus-within:border-yellow-600/50 transition-colors">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="اسأل ريكس عن أي شي..."
                className="flex-1 bg-transparent text-white placeholder-gray-600 resize-none text-sm outline-none max-h-32 min-h-[24px]"
                rows={1}
                style={{ height: "auto" }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height = Math.min(target.scrollHeight, 128) + "px";
                }}
              />
              <Sparkles className="w-4 h-4 text-yellow-600 flex-shrink-0 mb-0.5" />
            </div>
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || sendMessage.isPending}
              className="w-12 h-12 rounded-2xl btn-gold flex items-center justify-center flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sendMessage.isPending
                ? <RefreshCw className="w-5 h-5 animate-spin" />
                : <Send className="w-5 h-5" />
              }
            </button>
          </div>
          <p className="text-gray-700 text-xs text-center mt-2">
            ريكس مدعوم بالذكاء الاصطناعي • REX-SHOP™
          </p>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
