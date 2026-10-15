// Vercel serverless function: POST /api/subscribe
// Optional: set WEBHOOK_URL in Vercel env vars to forward signups
// (Zapier, Make, Slack incoming webhook, Google Apps Script, etc.)
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { email, company } = req.body || {};

  // Honeypot: bots fill this hidden field. Pretend success.
  if (company) return res.status(200).json({ ok: true });

  const clean = String(email || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean) || clean.length > 254) {
    return res.status(400).json({ error: 'Enter a valid email address.' });
  }

  try {
    console.log('New signup:', clean); // visible in Vercel > Logs
    if (process.env.WEBHOOK_URL) {
      const r = await fetch(process.env.WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // "text" makes this work with Slack webhooks out of the box
        body: JSON.stringify({ email: clean, text: `New waitlist signup: ${clean}` }),
      });
      if (!r.ok) throw new Error('Webhook failed: ' + r.status);
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Could not save your email. Try again in a minute.' });
  }
};
