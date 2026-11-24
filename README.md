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
- The scrapbook uses the bundled photographs in `public/assets/photos/`. Update `photoPaths` in `src/content.js` to change their order or filenames.
- Replace the letter and captions in `src/content.js` with your own words.

## Deploy to GitHub Pages

Pushing to `main` builds and deploys the site through GitHub Actions. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. The published project site is `https://shrukachiiii.github.io/Birthday/`.

The password is checked in browser code, so it makes a charming entrance screen but does not secure private content. Real privacy requires server-side password verification and private image storage.
