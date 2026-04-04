export default function handler(req, res) {
  res.status(200).send("API works 🚀");
}import type { Request, Response } from 'express';
import { getDb } from '../db';
import { storeIntegrations } from '../../drizzle/schema';

export default async function handler(req: Request, res: Response) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("No code provided");
  }

  try {
    const response = await fetch("https://accounts.salla.sa/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        client_id: "7e42b932-6690-477d-aba0-a9fca78047e5",
        client_secret: "fb00757f191f6e75ea747a4cefbaf6b977c0b187c9060b4caab2e4367409dce5",
        code: code,
        redirect_uri: "https://rex-shop-4.vercel.app/api/callback"
      })
    });

    const data = await response.json();

    console.log("Salla OAuth Response:", data);

    // حفظ بيانات الاتصال في قاعدة البيانات
    if (data.access_token) {
      const db = await getDb();
      if (db) {
        try {
          await db.insert(storeIntegrations).values({
            userId: 1, // يجب الحصول على معرف المستخدم من الجلسة
            storeType: "salla",
            storeName: data.merchant?.name || "متجر سلة",
            accessToken: data.access_token,
            refreshToken: data.refresh_token || null,
            storeUrl: data.merchant?.url || null,
            metadata: {
              expiresIn: data.expires_in,
              tokenType: data.token_type,
              merchant: data.merchant
            },
            isActive: true,
            lastSyncedAt: new Date(),
          });
        } catch (dbError) {
          console.error("Database error:", dbError);
        }
      }
    }

    return res.status(200).json({
      success: true,
      message: "تم الربط بنجاح مع سلة",
      data: data
    });

  } catch (error) {
    console.error("Salla OAuth Error:", error);
    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء الربط مع سلة",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
