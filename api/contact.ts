export const config = {
  runtime: 'edge',
};

// Strips HTML tags and limits length to prevent XSS in email content
function sanitizeInput(value: unknown, maxLength = 500): string {
  if (typeof value !== 'string') return '';
  return value.replace(/<[^>]*>/g, '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;'
  }[c] ?? c)).slice(0, maxLength);
}

export default async function handler(req: Request) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await req.json();
    const raw = body;
    const firstName = sanitizeInput(raw.firstName, 100);
    const lastName  = sanitizeInput(raw.lastName, 100);
    const email     = sanitizeInput(raw.email, 200);
    const company   = sanitizeInput(raw.company, 200);
    const needs     = sanitizeInput(raw.needs, 2000);

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not set');
      throw new Error('Internal Server Error: Missing API Key');
    }

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
        <h2 style="color: #4a7c59;">Nouveau Lead Client : ${company}</h2>
        <p><strong>Contact :</strong> ${firstName} ${lastName}</p>
        <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Entreprise :</strong> ${company}</p>
        <div style="margin-top: 20px; padding: 15px; border-left: 4px solid #84A232; background: #f9f9f9;">
          <h3 style="margin-top: 0;">Besoin exprimé :</h3>
          <p style="white-space: pre-wrap;">${needs}</p>
        </div>
      </div>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        // You can change 'from' if you have a verified domain on Resend (e.g. 'contact@wearetribu.fr')
        // For testing, onboarding@resend.dev works but only sends to the verified account email.
        from: 'TRIBU Leads <onboarding@resend.dev>',
        to: ['contact@tribu-recruitment.com'],
        subject: `Nouveau besoin de recrutement - ${company}`,
        html: htmlContent,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Resend API error: ${errorText}`);
    }

    const data = await res.json();

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error: any) {
    console.error('Email API Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
