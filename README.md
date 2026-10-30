# SelfIDeed website

The website for [selfideed.com](https://selfideed.com): official passport, visa and ID photos made with your phone.

- Static HTML, CSS and JavaScript. No build step.
- English (`/en/`) and Dutch (`/nl/`).
- Server: Nginx. An example config is in `nginx/selfideed.conf`.

## Run it locally

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000/en/.

## Settings you may need to change

| What | Where |
| --- | --- |
| Address of the photo app | `APP_URL` in `assets/js/layout.js` |
| Google Analytics 4 ID | `GA_ID` in `assets/js/consent.js` |
| Menu and footer links | `assets/js/layout.js` |

See `CLAUDE.md` for the structure and the building rules.
