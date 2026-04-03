/**
 * Stripe Products and Prices Configuration
 * These are the subscription plans available in REX-SHOP
 */

export const STRIPE_PRODUCTS = {
  // Free Plan
  FREE: {
    name: "الخطة المجانية",
    description: "ابدأ مع REX-SHOP مجاناً",
    price: 0,
    currency: "usd",
    features: [
      "توليد 5 حملات شهرياً",
      "توليد 10 تصاميم شهرياً",
      "مساعد ريكس الذكي",
      "دعم البريد الإلكتروني",
    ],
  },

  // Basic Plan
  BASIC: {
    name: "الخطة الأساسية",
    description: "للمتاجر الصغيرة والمتوسطة",
    price: 2999, // $29.99 in cents
    currency: "usd",
    interval: "month",
    priceId: process.env.STRIPE_BASIC_PRICE_ID,
    features: [
      "توليد 50 حملة شهرياً",
      "توليد 100 تصميم شهرياً",
      "مساعد ريكس الذكي المتقدم",
      "دعم الأولوية",
      "تحليلات أساسية",
      "ربط متجر واحد",
    ],
  },

  // Pro Plan
  PRO: {
    name: "الخطة الاحترافية",
    description: "للمتاجر المتنامية",
    price: 7999, // $79.99 in cents
    currency: "usd",
    interval: "month",
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    features: [
      "توليد 500 حملة شهرياً",
      "توليد 500 تصميم شهرياً",
      "مساعد ريكس الذكي غير محدود",
      "دعم الأولوية 24/7",
      "تحليلات متقدمة",
      "ربط 5 متاجر",
      "إدارة فريق (3 أعضاء)",
      "API Access",
    ],
  },

  // Enterprise Plan
  ENTERPRISE: {
    name: "الخطة المتقدمة",
    description: "للمتاجر الكبرى والشركات",
    price: 19999, // $199.99 in cents
    currency: "usd",
    interval: "month",
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID,
    features: [
      "توليد حملات غير محدودة",
      "توليد تصاميم غير محدودة",
      "مساعد ريكس الذكي غير محدود",
      "دعم مخصص 24/7",
      "تحليلات متقدمة جداً",
      "ربط متاجر غير محدودة",
      "إدارة فريق غير محدودة",
      "API Access متقدم",
      "استشارات تسويقية شهرية",
      "SLA مضمون",
    ],
  },
};

export const SUBSCRIPTION_PLANS = [
  {
    id: "basic",
    name: "الخطة الأساسية",
    price: 29.99,
    pricePerMonth: "29.99 دولار/شهر",
    description: "مثالية للمتاجر الصغيرة",
    features: [
      "50 حملة تسويقية شهرياً",
      "100 تصميم جرافيكي شهرياً",
      "مساعد ريكس الذكي",
      "دعم البريد الإلكتروني",
      "تحليلات أساسية",
    ],
    highlighted: false,
    stripeProductId: "prod_basic",
  },
  {
    id: "pro",
    name: "الخطة الاحترافية",
    price: 79.99,
    pricePerMonth: "79.99 دولار/شهر",
    description: "للمتاجر المتنامية",
    features: [
      "500 حملة تسويقية شهرياً",
      "500 تصميم جرافيكي شهرياً",
      "مساعد ريكس الذكي المتقدم",
      "دعم الأولوية 24/7",
      "تحليلات متقدمة",
      "ربط 5 متاجر",
      "إدارة فريق (3 أعضاء)",
    ],
    highlighted: true,
    stripeProductId: "prod_pro",
  },
  {
    id: "enterprise",
    name: "الخطة المتقدمة",
    price: 199.99,
    pricePerMonth: "199.99 دولار/شهر",
    description: "للشركات الكبرى",
    features: [
      "حملات تسويقية غير محدودة",
      "تصاميم جرافيكية غير محدودة",
      "مساعد ريكس الذكي غير محدود",
      "دعم مخصص 24/7",
      "تحليلات متقدمة جداً",
      "ربط متاجر غير محدودة",
      "إدارة فريق غير محدودة",
      "استشارات تسويقية شهرية",
    ],
    highlighted: false,
    stripeProductId: "prod_enterprise",
  },
];
