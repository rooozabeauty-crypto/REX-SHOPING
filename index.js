const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

// الصفحة الرئيسية
app.get('/', (req, res) => {
  res.send('🚀 Rex Shop API يعمل بنجاح');
});

// 🔗 OAuth Callback (سلة)
app.get('/api/callback', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.send('❌ لم يتم تقديم أي رمز');
  }

  try {
    const response = await fetch('https://accounts.salla.sa/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: process.env.CLIENT_ID, 7e42b932-6690-477d-aba0-a9fca78047e5
        client_secret: process.env.CLIENT_SECRET, fb00757f191f6e75ea747a4cefbaf6b977c0b187c9060b4caab2e4367409dce5
        code: code,
        redirect_uri: 'https://rex-shop-4.onrender.com/api/callback'
      }),
