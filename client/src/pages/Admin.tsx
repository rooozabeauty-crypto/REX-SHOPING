import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Crown,
  Shield,
  BarChart3,
  Megaphone,
  Palette,
  MessageSquare,
  Users,
  Settings,
  ArrowLeft,
  TrendingUp,
  Bell,
  Star,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function Admin() {
  const { user, isAuthenticated, loading } = useAuth();
  const { data: stats } = trpc.admin.stats.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
  });
  const { data: feedbackList } = trpc.feedback.list.useQuery();
  const [newUpdate, setNewUpdate] = useState({
    title: "",
    description: "",
    version: "",
    type: "feature" as const,
  });

  const createUpdate = trpc.updates.create.useMutation({
    onSuccess: () => {
      toast.success("تم إضافة التحديث بنجاح!");
      setNewUpdate({
        title: "",
        description: "",
        version: "",
        type: "feature",
      });
    },
    onError: () => toast.error("حدث خطأ أثناء الإضافة"),
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-red-900/30 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-red-400" />
          </div>
          <p className="text-gray-400">جاري التحقق من الصلاحيات...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"
        dir="rtl"
      >
        <div className="text-center max-w-md px-4">
          <Shield className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h2 className="text-3xl font-black text-white mb-4">وصول مقيّد</h2>
          <p className="text-gray-400 mb-8">
            تحتاج لتسجيل الدخول للوصول لهذه الصفحة
          </p>
          <a
            href={getLoginUrl()}
            className="btn-gold px-8 py-4 rounded-xl font-black text-lg inline-block"
          >
            تسجيل الدخول
          </a>
        </div>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div
        className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"
        dir="rtl"
      >
        <div className="text-center max-w-md px-4">
          <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h2 className="text-3xl font-black text-white mb-4">غير مصرح</h2>
          <p className="text-gray-400 mb-8">هذه الصفحة مخصصة للمشرفين فقط</p>
          <Link href="/dashboard">
            <button className="btn-gold px-8 py-4 rounded-xl font-black text-lg">
              العودة للوحة التحكم
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" dir="rtl">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-red-900/20">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <Crown className="w-8 h-8 text-yellow-500" />
              <span className="text-xl font-black gold-gradient">REX-SHOP</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <span className="bg-red-900/30 border border-red-600/40 text-red-400 text-xs px-3 py-1 rounded-full flex items-center gap-1">
              <Shield className="w-3 h-3" />
              لوحة الإدارة
            </span>
            <Link href="/dashboard">
              <button className="text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                لوحة التحكم
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Shield className="w-8 h-8 text-red-400" />
            لوحة إدارة REX-SHOP
          </h1>
          <p className="text-gray-500 mt-1">
            مرحباً {user.name}، لديك صلاحيات المشرف الكاملة
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              label: "إجمالي الحملات",
              value: stats?.campaigns || 0,
              icon: Megaphone,
              color: "text-blue-400",
              bg: "bg-blue-900/20",
            },
            {
              label: "طلبات التصميم",
              value: stats?.designs || 0,
              icon: Palette,
              color: "text-purple-400",
              bg: "bg-purple-900/20",
            },
            {
              label: "آراء العملاء",
              value: stats?.feedback || 0,
              icon: MessageSquare,
              color: "text-yellow-400",
              bg: "bg-yellow-900/20",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#111] rounded-2xl p-6 border border-red-900/10"
            >
              <div
                className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mb-4`}
              >
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className={`text-3xl font-black ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Update */}
          <div className="bg-[#111] rounded-2xl p-6 border border-red-900/20">
            <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5 text-yellow-500" />
              إضافة تحديث جديد
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">
                  نوع التحديث
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "feature", label: "ميزة جديدة" },
                    { id: "improvement", label: "تحسين" },
                    { id: "bugfix", label: "إصلاح" },
                    { id: "announcement", label: "إعلان" },
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() =>
                        setNewUpdate(prev => ({
                          ...prev,
                          type: t.id as typeof newUpdate.type,
                        }))
                      }
                      className={`py-2 rounded-lg text-sm transition-all ${newUpdate.type === t.id ? "btn-gold" : "bg-[#1a1a1a] text-gray-400 border border-gray-800"}`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block">
                  العنوان *
                </label>
                <input
                  type="text"
                  value={newUpdate.title}
                  onChange={e =>
                    setNewUpdate(prev => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="عنوان التحديث"
                  className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-600 text-sm"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block">
                  رقم الإصدار
                </label>
                <input
                  type="text"
                  value={newUpdate.version}
                  onChange={e =>
                    setNewUpdate(prev => ({ ...prev, version: e.target.value }))
                  }
                  placeholder="مثال: 2.1.0"
                  className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-600 text-sm"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block">
                  الوصف *
                </label>
                <textarea
                  value={newUpdate.description}
                  onChange={e =>
                    setNewUpdate(prev => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="وصف التحديث..."
                  className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 resize-none h-24 focus:outline-none focus:border-yellow-600 text-sm"
                />
              </div>
              <button
                onClick={() => {
                  if (!newUpdate.title || !newUpdate.description) {
                    toast.error("الرجاء ملء العنوان والوصف");
                    return;
                  }
                  createUpdate.mutate(newUpdate);
                }}
                disabled={createUpdate.isPending}
                className="w-full btn-gold py-3 rounded-xl font-bold disabled:opacity-50"
              >
                {createUpdate.isPending ? "جاري النشر..." : "نشر التحديث"}
              </button>
            </div>
          </div>

          {/* Recent Feedback */}
          <div className="bg-[#111] rounded-2xl p-6 border border-red-900/20">
            <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              آراء العملاء
            </h2>
            {feedbackList && feedbackList.length > 0 ? (
              <div className="space-y-3">
                {feedbackList.map((fb, i) => (
                  <div key={i} className="bg-[#1a1a1a] rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-bold text-sm">
                        {fb.name}
                      </span>
                      {fb.rating && (
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map(s => (
                            <Star
                              key={s}
                              className={`w-3 h-3 ${s <= fb.rating! ? "text-yellow-500 fill-yellow-500" : "text-gray-700"}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-gray-400 text-xs">{fb.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">لا توجد آراء معتمدة بعد</p>
              </div>
            )}
          </div>
        </div>

        {/* Admin Quick Links */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: Users,
              label: "إدارة المستخدمين",
              color: "bg-blue-900/20 text-blue-400",
            },
            {
              icon: Settings,
              label: "إعدادات المنصة",
              color: "bg-purple-900/20 text-purple-400",
            },
            {
              icon: TrendingUp,
              label: "تقارير الأداء",
              color: "bg-green-900/20 text-green-400",
            },
            {
              icon: Bell,
              label: "الإشعارات",
              color: "bg-yellow-900/20 text-yellow-400",
            },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => toast.info("هذه الميزة قيد التطوير")}
              className="bg-[#111] rounded-2xl p-5 text-center border border-red-900/10 hover:border-red-900/30 transition-all"
            >
              <div
                className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mx-auto mb-3`}
              >
                <item.icon className="w-6 h-6" />
              </div>
              <span className="text-white text-sm font-bold">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#080808] border-t border-red-900/20 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} REX-SHOP Admin Panel. جميع الحقوق
            محفوظة لـ REX-SHOP™
          </p>
        </div>
      </footer>
    </div>
  );
}
