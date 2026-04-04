const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.get("/api/callback", async (req, res) => {
  const code = req.query.code;

  // لو ما فيه code
  if (!code) {
    return res.send("❌ No code provided");
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
        redirect_uri: "https://YOUR-RENDER-URL.onrender.com/api/callback"
      })
    });

    const data = await response.json();

    res.json(data);

  } catch (err) {
    res.send("❌ Error getting token");
  }
});

app.get("/", (req, res) => {
  res.send("🚀 API is running");
});

app.listen(3000, () => {
  console.log("Server started 🚀");
});
