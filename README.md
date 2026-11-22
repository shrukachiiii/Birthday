# A Little World for You

A 12-page React birthday scrapbook built with Vite. It includes a password entrance, August 2026 calendar, twelve distinct paper-inspired pages, photo frames and film strips, a sealed letter reveal, a candle-blowing cake, keyboard-friendly navigation, a looping generated melody, and responsive phone layouts.

## Run locally

Install Node.js LTS, then run:

```sh
npm install
npm run dev
```

To make a production build, run `npm run build`.

## Personalize

- Edit `src/content.js` to change the entrance password, birthday date, date range, all page copy, photo captions, and the photo filenames.
- Replace the ten placeholder illustrations in `public/assets/photos/` with personal photographs. Keep the same filenames or update `photoPaths` in `src/content.js`.
- Upload up to ten photos with the camera button. Uploads are resized and kept in this browser's local storage.
- Replace the letter and captions in `src/content.js` with your own words.

The password is checked in browser code, so it makes a charming entrance screen but does not secure private content. Real privacy requires server-side password verification and private image storage.
