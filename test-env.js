const creds = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || "{}");
console.log("✅ Keys present:", Object.keys(creds));
console.log("🔑 Private key snippet:", creds.private_key?.slice(0, 40) || "(none)");
