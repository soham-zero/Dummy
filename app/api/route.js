import { google } from "googleapis";

export async function POST(req) {
  try {
    const payload = await req.json();
    const data = payload.data || {};

    if (!data.username || !data.email) {
      return new Response(JSON.stringify({ message: "username and email are required" }), { status: 400 });
    }

    if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY || !process.env.SHEET_ID) {
      console.error('Missing SHEET_ID or GOOGLE_SERVICE_ACCOUNT_KEY env vars');
      return new Response(JSON.stringify({ message: 'Missing SHEET_ID or GOOGLE_SERVICE_ACCOUNT_KEY env vars' }), { status: 500 });
    }

    // Parse the service account JSON safely and normalize the private key
    const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    let creds;
    try {
      // remove surrounding quotes if present
      const cleaned = rawKey.trim().replace(/^'|'$/g, '').replace(/^\"|\"$/g, '');
      creds = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error('Failed to parse GOOGLE_SERVICE_ACCOUNT_KEY JSON:', parseErr);
      return new Response(JSON.stringify({ message: 'Invalid GOOGLE_SERVICE_ACCOUNT_KEY JSON' }), { status: 500 });
    }

    if (creds.private_key && creds.private_key.includes('\\n')) {
      creds.private_key = creds.private_key.replace(/\\n/g, '\n');
    }

    if (!creds.private_key) {
      console.error('Service account JSON missing private_key');
      return new Response(JSON.stringify({ message: 'Service account JSON missing private_key' }), { status: 500 });
    }

    console.log(`Using service account: ${creds.client_email || '<no-email>'}; SHEET_ID present: ${!!process.env.SHEET_ID}`);

    // Use GoogleAuth with explicit credentials (more robust across googleapis versions)
    const auth = new google.auth.GoogleAuth({
      credentials: creds,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    const cols = [
      new Date().toISOString(),
      data.username || "",
      data.email || "",
      data.age || "",
      data.phone || "",
      data.gender || ""
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_ID,
      range: "Sheet1!A1",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [cols] },
    });

    return new Response(JSON.stringify({ ok: true, message: "Saved to sheet" }), { status: 200 });
  } catch (err) {
    console.error("Signup API error:", err);
    return new Response(JSON.stringify({ message: err.message || "Internal error" }), { status: 500 });
  }
}