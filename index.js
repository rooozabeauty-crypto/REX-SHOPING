const express = require('express');
const fetch = require('node-fetch');

const app = express();

// مهم جدًا لقراءة JSON من سلة
app.use(express.json());

// الصفحة الرئيسية (اختياري)
app.get('/', (req, res) => {
  res.send('🚀 Rex Shop API is running');
});


// 🔐 OAuth Callback من سلة
app.get('/api/callback', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.send('❌ لم يتم تقديم أي رمز');
  }

  try {
    const response = await
