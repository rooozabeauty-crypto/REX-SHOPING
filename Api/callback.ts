import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const code = req.query.code as string;

  // إذا ما فيه code
  if (!code) {
    return res.status(200).json({
      success: false,
      message: "No code provided"
    });
  }

  try {
    // طلب التوكن من سلة
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
        redirect_uri: "https://nex-r-shopping.onhercules.app/api/callback"
      })
    });

    const data = await response.json();

    // عرض النتيجة
    return res.status(200).json({
      success: true,
      data: data
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error
    });
  }
}
