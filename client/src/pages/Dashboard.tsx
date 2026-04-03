import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Crown, BarChart3, Megaphone, Palette, TrendingUp,
  Users, Mail, ShoppingBag, Bot, Settings, LogOut,
  Plus, ArrowLeft, Star, Zap, Globe
} from "lucide-react";

const quickActions = [
  { icon: Megaphone, label: "حملة جديدة", href: "/campaigns", color: "bg-blue-600" },
  { icon: Palette, label: "تصميم جديد", href: "/design", color: "bg-purple-600" },
  { icon: Bot, label: "اسأل ريكس", href: "/assistant", color: "bg-yellow-600" },
  { icon: BarChart3, label: "التقارير", href: "/dashboard", color: "bg-green-600" },
];

const menuItems = [
  { icon: BarChart3, label: "لوحة التحكم", href: "/dashboard", active: true },
  { icon: Megaphone, label: "الحملات الإعلانية", href: "/campaigns" },
  { icon: Palette, label: "التصميم الجرافيكي", href: "/design" },
  { icon: Globe, label: "الخدمات التسويقية", href: "/services" },
  { icon: Bot, label: "المساعد ريكس", href: "/assistant" },
  { icon: TrendingUp, label: "التحليلات", href: "/dashboard" },
  { icon: Mail, label: "البريد التسويقي", href: "/services" },
  { icon: ShoppingBag, label: "المتاجر المرتبطة", href: "/services" },
  { icon: Users, label: "إدارة العملاء", href: "/dashboard" },
  { icon: Settings, label: "الإعدادات", href: "/dashboard" },
];

export default function Dashboard() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const { data: campaigns } = trpc.campaigns.list.useQuery();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full gold-gradient-bg flex items-center justify-center mx-auto mb-4 pulse-gold">
            <Crown className="w-8 h-8 text-black" />
          </div>
          <p className="text-gray-400">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center" dir="rtl">
        <div className="text-center max-w-md px-4">
          <Crown className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
          <h2 className="text-3xl font-black text-white mb-4">سجّل دخولك أولاً</h2>
          <p className="text-gray-400 mb-8">تحتاج لتسجيل الدخول للوصول إلى لوحة التحكم</p>
          <a href={getLoginUrl()} className="btn-gold px-8 py-4 rounded-xl font-black text-lg inline-block gold-glow">
            تسجيل الدخول
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0d0d0d] border-l border-yellow-900/20 flex flex-col fixed h-full z-40">
        {/* Logo */}
        <div className="p-6 border-b border-yellow-900/20">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 rounded-full gold-gradient-bg flex items-center justify-center">
                <Crown className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-black gold-gradient">REX-SHOP</span>
            </div>
          </Link>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-yellow-900/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center text-black font-black">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div>
              <div className="text-white font-bold text-sm">{user?.name || "مستخدم"}</div>
              <div className="text-yellow-500 text-xs">{user?.role === "admin" ? "مشرف" : "عضو"}</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item, i) => (
              <Link key={i} href={item.href}>
                <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${item.active ? "gold-gradient-bg text-black" : "text-gray-400 hover:bg-yellow-900/10 hover:text-yellow-300"}`}>
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-yellow-900/20">
          <button
            onClick={() => logout()}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-900/10 transition-all w-full"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 mr-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-white">
              مرحباً، {user?.name?.split(" ")[0] || "بك"} 👋
            </h1>
            <p className="text-gray-500 mt-1">هذه لوحة تحكمك في REX-SHOP</p>
          </div>
          <Link href="/campaigns">
            <button className="btn-gold px-5 py-2.5 rounded-xl font-bold flex items-center gap-2">
              <Plus className="w-4 h-4" />
              حملة جديدة
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "إجمالي الحملات", value: campaigns?.length || 0, icon: Megaphone, color: "text-blue-400", bg: "bg-blue-900/20" },
            { label: "الزيارات هذا الشهر", value: "12.4K", icon: TrendingUp, color: "text-green-400", bg: "bg-green-900/20" },
            { label: "معدل التحويل", value: "3.2%", icon: BarChart3, color: "text-yellow-400", bg: "bg-yellow-900/20" },
            { label: "العملاء النشطون", value: "248", icon: Users, color: "text-purple-400", bg: "bg-purple-900/20" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#111] rounded-2xl p-6 border border-yellow-900/10"
            >
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mb-4`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className={`text-3xl font-black ${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-black text-white mb-4">إجراءات سريعة</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, i) => (
              <Link key={i} href={action.href}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="feature-card bg-[#111] rounded-2xl p-5 text-center cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mx-auto mb-3`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white text-sm font-bold">{action.label}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Campaigns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#111] rounded-2xl p-6 border border-yellow-900/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-white">آخر الحملات</h2>
              <Link href="/campaigns">
                <button className="text-yellow-400 text-sm flex items-center gap-1 hover:text-yellow-300 transition-colors">
                  عرض الكل <ArrowLeft className="w-4 h-4" />
                </button>
              </Link>
            </div>
            {campaigns && campaigns.length > 0 ? (
              <div className="space-y-3">
                {campaigns.slice(0, 5).map((campaign, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-xl">
                    <div>
                      <div className="text-white text-sm font-bold">{campaign.title}</div>
                      <div className="text-gray-500 text-xs">{campaign.type} • {campaign.platform}</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${campaign.status === "active" ? "bg-green-900/30 text-green-400" : "bg-gray-900/30 text-gray-400"}`}>
                      {campaign.status === "active" ? "نشط" : campaign.status === "draft" ? "مسودة" : "مكتمل"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Megaphone className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">لا توجد حملات بعد</p>
                <Link href="/campaigns">
                  <button className="mt-3 btn-gold px-4 py-2 rounded-lg text-sm font-bold">
                    إنشاء حملة
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Performance Chart Placeholder */}
          <div className="bg-[#111] rounded-2xl p-6 border border-yellow-900/10">
            <h2 className="text-xl font-black text-white mb-6">أداء الحملات</h2>
            <div className="flex items-end gap-2 h-32 mb-4">
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t gold-gradient-bg opacity-80 transition-all hover:opacity-100"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              {["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"].map((m, i) => (
                <span key={i}>{m.slice(0, 3)}</span>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full gold-gradient-bg" />
                <span className="text-gray-400">الزيارات</span>
              </div>
              <div className="text-green-400 font-bold flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +24% هذا الشهر
              </div>
            </div>
          </div>
        </div>

        {/* Admin Panel Link */}
        {user?.role === "admin" && (
          <div className="mt-8">
            <Link href="/admin">
              <div className="bg-[#111] rounded-2xl p-6 border border-red-900/30 hover:border-red-600/50 transition-all cursor-pointer flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-900/30 flex items-center justify-center">
                    <Settings className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-black">لوحة الإدارة</h3>
                    <p className="text-gray-500 text-sm">إدارة المستخدمين والإحصائيات والمحتوى</p>
                  </div>
                </div>
                <ArrowLeft className="w-5 h-5 text-gray-500" />
              </div>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
