export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(200).send("No code provided");
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

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).send("Error getting token");
  }
}
