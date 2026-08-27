const MAX_REQUEST_BYTES = 64_000;
const MAX_EMAIL_LENGTH = 254;
const MAX_NAME_LENGTH = 100;
const MAX_COMPANY_LENGTH = 160;
const MAX_CASE_LENGTH = 3_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const responseHeaders = {
  'Cache-Control': 'no-store',
  'Content-Type': 'application/json; charset=utf-8',
  'X-Content-Type-Options': 'nosniff',
};

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: responseHeaders });
}

function field(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === 'string' ? value.trim() : '';
}

function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    };
    return entities[character];
  });
}

function isAllowedOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return true;

  try {
    const originUrl = new URL(origin);
    const requestUrl = new URL(request.url);
    if (originUrl.host === requestUrl.host) return true;

    const configuredOrigins = (process.env.CONTACT_ALLOWED_ORIGINS ?? '')
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);

    return configuredOrigins.includes(originUrl.origin);
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return json({ ok: false, message: 'Origin not allowed.' }, 403);
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return json({ ok: false, message: 'Request is too large.' }, 413);
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return json({ ok: false, message: 'Invalid form submission.' }, 400);
  }

  // Bots commonly fill fields hidden from real visitors. Return success without sending.
  if (field(formData, 'company_website')) {
    return json({ ok: true });
  }

  const source = singleLine(field(formData, 'source'));
  const name = singleLine(field(formData, 'name'));
  const company = singleLine(field(formData, 'company'));
  const email = field(formData, 'email').toLowerCase();
  const caseDetails = field(formData, 'case');
  const page = singleLine(field(formData, 'page'));
  const privacyConsent = field(formData, 'privacy_consent');
  const isFullRequest = source === 'Services contact form';

  if (!EMAIL_PATTERN.test(email) || email.length > MAX_EMAIL_LENGTH) {
    return json({ ok: false, message: 'Please enter a valid business email.' }, 400);
  }

  if (name.length > MAX_NAME_LENGTH || company.length > MAX_COMPANY_LENGTH) {
    return json({ ok: false, message: 'One or more fields are too long.' }, 400);
  }

  if (caseDetails.length > MAX_CASE_LENGTH) {
    return json({ ok: false, message: 'Case details are too long.' }, 400);
  }

  if (isFullRequest && (name.length < 2 || caseDetails.length < 20 || privacyConsent !== 'accepted')) {
    return json({ ok: false, message: 'Please complete all required fields.' }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? 'info@shieldifyip.com';
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    console.error('Contact function is missing RESEND_API_KEY or CONTACT_FROM_EMAIL.');
    return json({ ok: false, message: 'Contact service is not configured.' }, 503);
  }

  const safeName = escapeHtml(name || 'Not provided');
  const safeCompany = escapeHtml(company || 'Not provided');
  const safeEmail = escapeHtml(email);
  const safeSource = escapeHtml(source || 'Website contact form');
  const safePage = escapeHtml(page || 'Not provided');
  const safeCase = escapeHtml(caseDetails || 'Quick consultation request').replace(/\n/g, '<br />');
  const requestId = crypto.randomUUID();
  const subjectName = name ? ` from ${name}` : '';

  let resendResponse: Response;
  try {
    resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': requestId,
        'User-Agent': 'shieldify-ip-contact/1.0',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `New Shieldify IP consultation request${subjectName}`,
        text: [
          `Name: ${name || 'Not provided'}`,
          `Company: ${company || 'Not provided'}`,
          `Email: ${email}`,
          `Source: ${source || 'Website contact form'}`,
          `Page: ${page || 'Not provided'}`,
          '',
          'Case details:',
          caseDetails || 'Quick consultation request',
        ].join('\n'),
        html: `
          <h2>New consultation request</h2>
          <table cellpadding="6" cellspacing="0" style="border-collapse:collapse">
            <tr><td><strong>Name</strong></td><td>${safeName}</td></tr>
            <tr><td><strong>Company</strong></td><td>${safeCompany}</td></tr>
            <tr><td><strong>Email</strong></td><td><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
            <tr><td><strong>Source</strong></td><td>${safeSource}</td></tr>
            <tr><td><strong>Page</strong></td><td>${safePage}</td></tr>
          </table>
          <h3>Case details</h3>
          <p>${safeCase}</p>
        `,
      }),
    });
  } catch {
    console.error('Could not reach Resend.', { requestId });
    return json({ ok: false, message: 'Email service is unavailable.' }, 502);
  }

  if (!resendResponse.ok) {
    console.error('Resend rejected a contact email.', {
      status: resendResponse.status,
      requestId,
    });
    return json({ ok: false, message: 'Email delivery failed.' }, 502);
  }

  return json({ ok: true, requestId });
}

export function GET() {
  return json({ ok: false, message: 'Method not allowed.' }, 405);
}
