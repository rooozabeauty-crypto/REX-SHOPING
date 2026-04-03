export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('No code provided');
  }

  try {
    const response = await fetch('https://rexshop-uiwizce4.manus.space/.salla.sa/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: 'YOUR_CLIENT_ID',7e42b932-6690-477d-aba0-a9fca78047e5
        client_secret: 'YOUR_CLIENT_SECRET',fb00757f191f6e75ea747a4cefbaf6b977c0b187c9060b4caab2e4367409dce5
        code: code,
        redirect_uri: 'https://YOUR-VERCEL-URL/api/callback'
      })
    });

    const data = await response.json();

    console.log(data);

    return res.send('تم الربط بنجاح 🔥');
  } catch (err) {
    return res.status(500).send('Error');
  }
}
