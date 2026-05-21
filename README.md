# Pari Tour And Travel Website Demo

This is a static demo website for a domestic tour, adventure tour, taxi booking,
hotel booking, B2B, and B2C travel business.

## Local Preview Setup

Open this folder:

```text
C:\Users\Kuldeep\Documents\Codex\2026-05-21\please-act-like-a-website-developer
```

Then open `index.html` directly in a browser, or run a local server:

```powershell
python -m http.server 4173
```

Visit:

```text
http://127.0.0.1:4173/
```

## Files

- `index.html` - Website structure and content
- `styles.css` - Responsive visual design
- `script.js` - Mobile menu and demo enquiry capture

## Demo Features

- Premium travel homepage
- Domestic and adventure package cards
- Taxi, hotel, custom package, and ground support service sections
- B2B travel partner section
- B2C customer section
- Detailed enquiry form
- Local backup inbox using `localStorage`
- Optional live enquiry submission to Google Sheets using Apps Script
- WhatsApp and call buttons

## Notes

By default, the form stores a local backup in the visitor's browser. To make it
live, create a free Google Apps Script Web App and paste that URL into
`FORM_ENDPOINT` inside `script.js`.

## Production Setup Options

1. Static hosting only:
   Upload `index.html`, `styles.css`, and `script.js` to Hostinger, cPanel,
   Netlify, Vercel, or any static hosting provider.

2. Enquiry by email:
   Connect the forms to a backend service such as Formspree, Web3Forms,
   EmailJS, PHP mail, Node.js, or Laravel.

3. Enquiry to Google Sheets:
   Use the included `google-apps-script.gs` file to save every enquiry in a
   spreadsheet and send an email notification.

4. Admin dashboard:
   Use a database such as MySQL, Firebase, Supabase, or MongoDB and build an
   admin panel for viewing enquiries.

## Details To Replace Before Launch

- Phone number: `+91 9516301061`
- WhatsApp number: `919516301061`
- Email: `Admin@ParitourandTravel.com`
- Address: `New Delhi, India`
- Package prices and destinations
- Real logo and brand colors, if available

## Free Live Setup

Read `LIVE_SETUP_HINDI.md` for a no-subscription setup using GitHub Pages and
Google Sheets.
