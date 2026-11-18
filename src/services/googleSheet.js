// Google Sheets integration service
// You can set VITE_GOOGLE_SHEET_URL in a .env file or paste the deployed Apps Script URL below

export const GOOGLE_SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL || '';

/**
 * Sends submission data (RSVP or Blessing) to the configured Google Sheet
 * @param {Object} data 
 * @returns {Promise<boolean>}
 */
export async function sendToGoogleSheet(data) {
  if (!GOOGLE_SHEET_URL) {
    // If not configured yet, fallback quietly without erroring out
    console.info('Google Sheet URL not configured. Data stored locally.');
    return false;
  }

  try {
    // Using fetch with text/plain or no-cors ensures Google Apps Script receives the POST without preflight CORS blocks
    await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        ...data,
        submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      }),
    });
    return true;
  } catch (err) {
    console.warn('Google Sheet submission warning:', err);
    return false;
  }
}
