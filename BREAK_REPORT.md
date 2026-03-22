# MQR 2.0 — Break Stage Report

## HTTP Errors Reproduced

| Error | Route | Method | Result |
|-------|-------|--------|--------|
| 404 | /fakeroute | GET | ✅ |
| 404 | /registrations/99999 | GET | ✅ |
| 400 | /register | POST empty | ✅ |
| 400 | /register | POST missing fields | ✅ |
| 415 | /register | POST wrong type | ✅ |
| 405 | /registrations | DELETE | ✅ |
| 400 | /register | POST invalid JSON | ✅ |
| 413 | /register | POST huge payload | ✅ |

## Findings
- Backend does not handle all errors gracefully
- Some routes return 500 instead of proper error codes
- SQL injection is handled by better-sqlite3 safely
