# Calendar Studio — EFX Economic Calendar Generator

A desktop-style, zero-dependency web tool that turns a **JSON economic calendar** into a polished, print-ready **SVG / PNG** (Full HD → 8K). Built for Persian (RTL) and English channels, with swappable brand **templates**.

![status](https://img.shields.io/badge/build-no%20deps-gold) ![license](https://img.shields.io/badge/fonts-OFL-blue)

## Features
- JSON in → vector SVG out (also PNG), 1920 / 2560 / 3840 / 7680 px, height adapts to the number of events
- Template system: colours, brand, socials, logo, labels and language live in a template JSON
- 4 built-in templates: **EFX Forex (gold)**, Neon Cyan, Emerald Dark, Clean Light — or import your own
- **All world flags** (265, vector) for any currency/country code, impact bulls, speech badges, holiday rows
- **Click-to-edit**: click any element in the preview to change text, colour, font size/weight, spacing, opacity, position (or arrow keys), flag country, visibility - for one element or all of its kind
- Edits are saved as `overrides` inside the template, so **Save template** exports your design
- Fonts embedded into every export (Inter + Vazirmatn) so SVG/PNG look identical everywhere
- Bilingual UI (فارسی / English, RTL/LTR) and dark / light theme

## Run
Open `index.html` in a browser — no server, no install.
Optional: `python -m http.server 8080` and visit `http://localhost:8080`.

## Project structure
```
index.html          app shell
css/app.css         UI theme (dark/light tokens)
js/flags.js         flag helpers, hand-drawn fallbacks, social icons
js/world-flags.js   all country flags (country-flag-icons, MIT)
js/editor.js        click-to-edit inspector (writes template.overrides)
js/renderer.js      SVG engine: build(data, px, {min})
js/app.js           UI: i18n, theme, templates, import/export
js/data.js          generated: templates + sample + default logo
js/fonts.js         generated: embedded font CSS
templates/*.json    brand templates (edit / add yours)
data/*.json         sample calendar data
tools/build.py      regenerates js/data.js + js/fonts.js, optional single-file bundle
```
After editing `templates/` or `data/`, run `python tools/build.py` (add `bundle` for `dist/calendar-studio.html`).

## Data JSON
```json
{ "date": "Tuesday 6 Oct 2026", "isoDate": "2026-10-06", "lang": "en",
  "events": [{ "time": "16:00", "currency": "USD", "country": "DE",
    "impact": "high | medium | low | holiday", "title": "Trade Balance (Aug)",
    "previous": "-88.60B", "forecast": "-95.20B", "actual": "-90.1B",
    "tone": "good | bad", "speech": false }] }
```
Any template field (`title`, `brand`, `theme`, `labels`, `timezoneNote`, `subtitle`, `disclaimer`) can be overridden in the data JSON.

## Template JSON
`id`, `name`, `lang` (`fa`/`en`), `title`, `timezoneNote`, `brand {name, tagline, logo: "default" | "none" | data-URI, socials[{type,text}]}`, `theme {gold, gold2, high, med, low, pos, bg1, bg2, p1, p2, tx, mut, v1, v2, row}`. Social types: `instagram telegram youtube x web`.

## Credits
Flags: [country-flag-icons](https://github.com/catamphetamine/country-flag-icons) (MIT). Fonts: [Inter](https://rsms.me/inter/) and [Vazirmatn](https://github.com/rastikerdar/vazirmatn), SIL OFL 1.1 (via Fontsource).
Made by [KouchakiDev](https://github.com/KouchakiDev).

---

## فارسی
ابزار تولید تقویم اقتصادی: JSON را وارد می‌کنید و SVG/PNG با کیفیت تا ۸K می‌گیرید. تمپلیت‌ها (رنگ، برند، لوگو، شبکه‌های اجتماعی) جدا از داده هستند؛ فقط `index.html` را باز کنید.
