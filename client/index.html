const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

// الصفحة الرئيسية
app.get('/', (req, res) => {
  res.send('🚀 Rex Shop API يعمل');
});

// callback من سلة
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
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: code,
        redirect_uri: 'https://rex-shop-4.vercel.app/api/callback',
      }),
    });

    const data = await response.json();
    console.log(data);

    res.send('✅ تم الربط بنجاح 🔥');
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ خطأ في السيرفر');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('🚀 Server running on port ' + PORT);
});
