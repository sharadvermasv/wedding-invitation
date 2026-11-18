/**
 * ============================================================
 * SHUBHAM & PREETI WEDDING — GOOGLE SHEET APPS SCRIPT
 * ============================================================
 * 
 * INSTRUCTIONS:
 * 1. Open Google Sheets (https://sheets.new)
 * 2. Title the sheet: "Shubham & Preeti Wedding - Guest Responses"
 * 3. In the top menu, click: Extensions -> Apps Script
 * 4. Delete any code in the editor, and paste THIS ENTIRE FILE.
 * 5. Click the "Save" icon (Floppy disk).
 * 6. Click the blue "Deploy" button (top right) -> "New deployment"
 * 7. Click the gear icon beside "Select type" -> select "Web app"
 * 8. Set:
 *    - Description: "Wedding RSVP & Blessings Webhook"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"  <--- (IMPORTANT so guests can submit without signing in)
 * 9. Click "Deploy", approve permissions if prompted, and copy the "Web App URL".
 * 10. Paste that Web App URL into your project's .env file:
 *     VITE_GOOGLE_SHEET_URL=https://script.google.com/macros/s/..../exec
 * 
 * The script will automatically create two formatted tabs in your sheet:
 *   - "RSVPs" (Timestamp, Name, Phone, Status, Guest Count)
 *   - "Blessings" (Timestamp, Name, Warm Blessing)
 */

function doPost(e) {
  try {
    var sheetApp = SpreadsheetApp.getActiveSpreadsheet();
    var rawData = e.postData ? e.postData.contents : '';
    if (!rawData) {
      return respondJson({ status: 'error', message: 'No payload' });
    }

    var data = JSON.parse(rawData);
    var timestamp = data.submittedAt || Utilities.formatDate(new Date(), 'Asia/Kolkata', 'dd-MMM-yyyy hh:mm a');

    if (data.type === 'blessing') {
      var blessingsSheet = getOrCreateSheet(sheetApp, 'Blessings', [
        'Timestamp (IST)',
        'Guest / Family Name',
        'Blessing Message'
      ]);
      blessingsSheet.appendRow([
        timestamp,
        data.name || 'Anonymous',
        data.text || ''
      ]);
      formatNewRow(blessingsSheet);
    } else {
      // Default to RSVP
      var rsvpSheet = getOrCreateSheet(sheetApp, 'RSVPs', [
        'Timestamp (IST)',
        'Guest / Family Name',
        'WhatsApp / Phone',
        'Attendance Status',
        'Total Guests Attending'
      ]);
      rsvpSheet.appendRow([
        timestamp,
        data.name || 'Unknown',
        data.phone ? "'" + data.phone : '',
        data.status === 'attending' ? 'Joyfully Attending' : 'Regretfully Declining',
        data.status === 'declined' ? 0 : Number(data.guestCount) || 1
      ]);
      formatNewRow(rsvpSheet);
    }

    return respondJson({ status: 'success' });
  } catch (err) {
    return respondJson({ status: 'error', error: err.toString() });
  }
}

function doGet(e) {
  return respondJson({ status: 'active', message: 'Wedding RSVP Webhook is ready.' });
}

function getOrCreateSheet(spreadsheet, sheetName, headers) {
  var sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#9E102D');
    headerRange.setFontColor('#FFFFFF');
    headerRange.setFontWeight('bold');
    headerRange.setFontFamily('Georgia');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function formatNewRow(sheet) {
  var lastRow = sheet.getLastRow();
  var numCols = sheet.getLastColumn();
  if (lastRow > 1) {
    var range = sheet.getRange(lastRow, 1, 1, numCols);
    range.setFontFamily('Arial');
    range.setFontSize(10);
    range.setVerticalAlignment('middle');
  }
}

function respondJson(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
