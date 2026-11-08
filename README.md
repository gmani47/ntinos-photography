# Konstantinos Lianos

Static photography portfolio for Konstantinos (Ntinos) Lianos, a landscape photographer based in Kleinarl, Salzburg, Austria.

The page is Greek. The photographer’s name stays in Latin script. All 15 photographs are the supplied JPEGs, copied unchanged, in manifest order. There is no contact link because no email address was supplied.

## Preview locally

From this directory:

```bash
python3 -m http.server 8741 --bind 0.0.0.0
```

Open `http://127.0.0.1:8741/`.

The hero is `photos/photo-04.jpg` (alpine valley, lake, wooden building). The same photograph remains in the gallery.

## Files

- `index.html` — page
- `css/site.css` — layout
- `js/photos.js` — ordered photo manifest
- `js/site.js` — gallery and viewer
- `photos/photo-01.jpg` … `photos/photo-15.jpg` — photographs

No build step, fonts, analytics, or external services.

## Publishing

This copy is not a public website. To publish it on GitHub Pages for the account `@gmani47`:

1. Create a new public repository while logged in as `@gmani47`.
2. Push this project so `index.html` is at the repository root on the default branch.
3. In the repository, open Settings → Pages, and deploy from that branch, folder `/` (root).
4. Open the Pages URL GitHub displays and confirm the photographs load.

No GitHub repository URL was available here, so that repository was not created and the site was not deployed.
