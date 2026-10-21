# M'Aiken Magic website

The website for **M'Aiken Magic**, FIRST Robotics Competition Team 1102 at Aiken High School in Aiken, SC, supported by the M'Aiken Magic STEM Education Foundation.

A static site built with [Eleventy](https://www.11ty.dev/) and published to GitHub Pages. Content is data in small JSON files, so most updates are a few lines of text.

> **Want to change something on the site?** Start with **[GUIDE.md](GUIDE.md)**. No technical knowledge needed.
>
> **Setting it up for the first time?** [SETUP.md](SETUP.md).
>
> **Working on the design or code?** [DESIGN.md](DESIGN.md) and [CONTRIBUTING.md](CONTRIBUTING.md).

## How a change reaches the live site

```
ask Claude, or file a request
        |
        v
a branch and pull request are opened
        |
        +--> screenshots of every changed page, desktop and phone
        +--> a live preview link (Cloudflare)
        |
        v
a maintainer reviews and merges into main
        |
        v
GitHub Actions deploys the site (1 to 2 minutes)
```

Nothing reaches the public site until a maintainer merges to `main`.

## What lives where

| File | Controls |
| --- | --- |
| `src/_data/site.json` | Name, contact details, navigation, join and donate links |
| `src/_data/events.json` | Competitions and other dates (upcoming or earlier is worked out automatically) |
| `src/_data/sponsors.json` | Sponsors and the eight giving levels |
| `src/_data/faqs.json` | FAQ questions and answers |
| `src/_data/leadership.json` | Adult leaders on the About page |
| `src/_data/subteams.json` | The five subteams |
| `src/_data/programs.json` | FRC, FLL, and off-season program descriptions |
| `src/_data/photos.json` | Photos on the About page |
| `src/assets/css/tokens.css` | Colors, fonts, and sizes |
| `lib/sigil.mjs` | The gear-and-rune artwork on the home page |

Page templates are the `.njk` files in `src/`.

## Running it locally

Only for people editing the code themselves. The workflow above never needs it.

```
npm install
npm start          # http://localhost:8080 with live reload
```

| Command | What it does |
| --- | --- |
| `npm run build` | Build the site into `_site/` |
| `npm run check` | Build, then check links, alt text, and headings |
| `npm run review` | Build and screenshot every page into `review.html` |
| `npm run build:preview` | Build, then mark it as a preview (what Cloudflare runs) |

Requires Node.js 20 or newer.

## Design

Deep forest green (`#254118`) and black, with Bebas Neue headlines and Source Sans 3 body text, both self-hosted. The hero artwork is a gear drawn as a magic circle, generated in code. There are no third-party requests when a page loads: no analytics, no embeds, no CDN. See [DESIGN.md](DESIGN.md).

---

FIRST® is a registered trademark of For Inspiration and Recognition of Science and Technology (FIRST), which is not affiliated with this website.
