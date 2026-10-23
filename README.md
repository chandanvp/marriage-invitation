# Ananya & Chandan — Wedding e-invite

Static site (no build step) for GitHub Pages: `https://marriage.sleepysoul.cc/`

## Files
- `index.html` · `styles.css` · `script.js` — the invite
- `artwork/` — Ghibli-style watercolour illustrations (`hands` on the cover, `couple` on the Couple page and keepsake card, `reception`, `muhurtam`, `lunch`, `venue`) and `og.jpg` (WhatsApp/link preview)
- `favicon.svg` — AC monogram · `.nojekyll` — serve as-is

## Personalised links
Append the guest's name to the URL — it appears on the envelope, the cover and the farewell page:

```
https://marriage.sleepysoul.cc/?to=Priya+%26+Family
https://marriage.sleepysoul.cc/?to=Uncle+Ramesh
```
(`&` must be written as `%26`; spaces as `+`.)

## Handy preview params (not for guests)
- `?open=1` — skip the envelope · `&p=N` — land on page N (0–8)
- `?demo=open` — auto-opens the envelope after 1.2 s
- `&at=2026-12-03T20:00:00%2B05:30` — freeze the clock to preview countdown states
- `&card=1` — render the "Save my invite" keepsake card full-screen

## To verify
- Transit distances on the *Getting there* page (currently ≈ values)

## Deploy
```
git push -u origin main
```
then GitHub → Settings → Pages → Source: `main` / root.
