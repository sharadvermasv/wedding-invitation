# Shubham weds Preeti — wedding invitation (React)

Layout modelled on the Wix "Wedding Invitation (Pastoral)" template (wh-1066), Indianised.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # static site in dist/ — upload to Netlify, Vercel, GitHub Pages, etc.
```

## Edit

- All wording, dates and phone numbers: `src/content.js`
- Photos: put images in `public/photos/` and set the paths in `photos` inside `src/content.js`
  (null = textile-pattern illustration).
- Personal links: add `?to=Name` to the URL, e.g. `.../?to=Sharma%20Family`.

`legacy/` holds the earlier single-file HTML versions (including the At-Home page).
