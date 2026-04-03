import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  ShoppingBag, Link as LinkIcon, Trash2, CheckCircle,
  AlertCircle, Loader2
} from "lucide-react";

const STORE_TYPES = [
  {
    id: "salla",
    name: "منصة سلة",
    description: "ربط متجرك على منصة سلة السعودية",
    icon: "🛍️",
    color: "from-blue-900/30 to-blue-900/10",
    border: "border-blue-800/40",
    clientId: "7e42b932-6690-477d-aba0-a9fca78047e5",
  },
  {
    id: "zid",
    name: "منصة زد",
    description: "ربط متجرك على منصة زد الإمارات",
    icon: "🏪",
    color: "from-purple-900/30 to-purple-900/10",
    border: "border-purple-800/40",
    clientId: "zid-client-id",
  },
  {
    id: "shopify",
    name: "Shopify",
    description: "ربط متجرك على منصة Shopify العالمية",
    icon: "🌐",
    color: "from-green-900/30 to-green-900/10",
    border: "border-green-800/40",
    clientId: "shopify-client-id",
  },
  {
    id: "woocommerce",
    name: "WooCommerce",
    description: "ربط متجرك على WooCommerce",
    icon: "📦",
    color: "from-orange-900/30 to-orange-900/10",
    border: "border-orange-800/40",
    clientId: "woocommerce-client-id",
  },
];

export default function StoreIntegration() {
  const { user, isAuthenticated } = useAuth();
  const [connectedStores, setConnectedStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-black to-black flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gold-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">ربط المتاجر</h1>
          <p className="text-gray-400 mb-6">سجل دخول لربط متاجرك</p>
          <Button
            onClick={() => (window.location.href = getLoginUrl())}
            className="bg-gold-500 hover:bg-gold-600 text-black font-bold"
          >
            تسجيل الدخول
          </Button>
        </div>
      </div>
    );
  }

  const handleSallaConnect = () => {
    const redirectUri = "https://rex-shop-4.vercel.app/api/callback";
    const authUrl = `https://accounts.salla.sa/oauth2/auth?client_id=7e42b932-6690-477d-aba0-a9fca78047e5&response_type=code&scope=offline_access&redirect_uri=${encodeURIComponent(redirectUri)}`;
    window.open(authUrl);
    toast.success("تم فتح صفحة الربط مع سلة في نافذة جديدة");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-black pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 bg-gold-500/10 border border-gold-500/30 rounded-full px-4 py-2 mb-6">
            <LinkIcon className="w-4 h-4 text-gold-400" />
            <span className="text-gold-400 text-sm font-semibold">ربط المتاجر الإلكترونية</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            ربط متجرك مع REX-SHOP
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            ربط متجرك على منصات التجارة الإلكترونية المختلفة وأدر جميع عملياتك من مكان واحد
          </p>
        </div>

        {/* Connected Stores */}
        {connectedStores.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">المتاجر المتصلة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {connectedStores.map((store) => (
                <Card
                  key={store.id}
                  className="bg-black/40 border border-green-800/40 p-6 hover:border-green-800/60 transition"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <h3 className="text-lg font-bold text-white">{store.storeName}</h3>
                      </div>
                      <p className="text-gray-400 text-sm">{store.storeType}</p>
                      <p className="text-gray-500 text-xs mt-2">
                        آخر تحديث: {new Date(store.lastSyncedAt).toLocaleDateString("ar-SA")}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Available Stores */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">المتاجر المتاحة للربط</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STORE_TYPES.map((store) => (
              <Card
                key={store.id}
                className={`bg-gradient-to-br ${store.color} border ${store.border} p-8 hover:border-opacity-100 transition cursor-pointer group`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{store.icon}</div>
                  <LinkIcon className="w-5 h-5 text-gold-400 opacity-0 group-hover:opacity-100 transition" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{store.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{store.description}</p>

                {store.id === "salla" ? (
                  <Button
                    onClick={handleSallaConnect}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        جاري الربط...
                      </>
                    ) : (
                      <>
                        <LinkIcon className="w-4 h-4 mr-2" />
                        ربط مع سلة
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    disabled
                    className="w-full bg-gray-700 text-gray-400 cursor-not-allowed"
                  >
                    <AlertCircle className="w-4 h-4 mr-2" />
                    قريباً
                  </Button>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "إدارة موحدة",
              desc: "أدر جميع متاجرك من لوحة تحكم واحدة",
              icon: "🎛️",
            },
            {
              title: "مزامنة تلقائية",
              desc: "مزامنة البيانات والمنتجات تلقائياً",
              icon: "🔄",
            },
            {
              title: "تقارير شاملة",
              desc: "احصل على تقارير مفصلة لكل متجر",
              icon: "📊",
            },
          ].map((feature, idx) => (
            <Card
              key={idx}
              className="bg-black/40 border border-gray-800/40 p-6 text-center hover:border-gold-500/40 transition"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
