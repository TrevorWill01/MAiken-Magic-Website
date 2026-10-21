# M'Aiken Magic website: working notes for Claude

This repository is the source for the website of **M'Aiken Magic**, FIRST Robotics Competition Team 1102 at Aiken High School in Aiken, SC. The team is supported by the M'Aiken Magic STEM Education Foundation.

It is a static site built with [Eleventy](https://www.11ty.dev/) and published to GitHub Pages by a GitHub Action. There is no server and no database.

## The rule that matters most

**Content lives in `src/_data/*.json`, not in templates.** Before editing a template, check whether the change is really a data change. Adding an event, a sponsor, a FAQ, or a leader should never require touching HTML.

| To change this | Edit this |
| --- | --- |
| Team name, email, address, nav, join/donate links, social links | `src/_data/site.json` |
| Competitions and other dates | `src/_data/events.json` |
| Sponsors and giving levels | `src/_data/sponsors.json` |
| FAQ questions and answers | `src/_data/faqs.json` |
| People shown on About | `src/_data/leadership.json` |
| Subteam descriptions | `src/_data/subteams.json` |
| FRC, FLL, and off-season program blurbs | `src/_data/programs.json` |
| Past robots (Robots page) | `src/_data/robots.json` and `src/assets/img/robots/` |
| Photos on About | `src/_data/photos.json` and `src/assets/img/photos/` |

Page templates are the `.njk` files in `src/`. The shared header and footer are in `src/_includes/partials/`.

## Layout of the repository

```
src/
  _data/            content as JSON (see the table above); links.js builds the mailto fallbacks
  _includes/
    layouts/base.njk        the page shell
    partials/               header.njk, footer.njk
  assets/
    css/tokens.css          every color, font, and size. Restyle here first.
    css/site.css            components and layout
    css/fonts.css           @font-face rules (do not hand-edit)
    fonts/                  Bebas Neue and Source Sans 3, self-hosted
    img/                    brand/ (team logo), photos/, robots/, sponsors/
    js/site.js              mobile menu. Nothing else.
  *.njk                     one file per page
lib/sigil.mjs               generates the gear-and-rune hero artwork
scripts/check-links.mjs     fails the build on a broken link, missing alt text, or wrong h1 count
scripts/mark-preview.mjs    turns a build into a badged, noindexed preview
scripts/review-shots.mjs    screenshots pages into one review file
.claude/skills/             /add-sponsor, /update-events, /add-faq, /add-mentor, /add-robot
.github/                    workflows, CODEOWNERS, PR and issue templates
```

## Commands

```
npm install        # once
npm start          # local preview at http://localhost:8080 with live reload
npm run build      # write the site to _site/
npm run check      # build, then verify links, alt text, and one h1 per page
npm run review     # build, screenshot pages, write review.html
```

Always run `npm run check` before handing work back.

## Handing work back

**The reviewer must never have to run anything.** Finish every change this way:

1. `npm run check` passes.
2. `npm run review -- review.html --pages=/events/,/` screenshots only the pages the change touched, at desktop and phone width. Omit `--pages` to capture everything.
3. Publish `review.html` as an artifact and put the link in your reply.
4. Push a branch and open a pull request. **Never push to `main`.** Fill in `.github/pull_request_template.md`. Cloudflare comments a live preview link on the pull request within a minute or so.

If the dates, names, or amounts in a request look ambiguous, ask before guessing.

## Facts you must not invent

This site speaks for a youth organization. Do not make up any of the following. If the request does not supply it, leave it out or ask.

- Competition results, rankings, awards, or win-loss records
- Dollar amounts raised, student counts, alumni outcomes, or founding dates
- Sponsor names, logos, or sponsorship levels
- Tax-deductibility claims or nonprofit-status claims (ask a mentor to confirm the exact wording)
- Anything about a specific student

Competition results come from The Blue Alliance (`https://www.thebluealliance.com/team/1102/<year>`). Copy what it states and nothing more. Leave a field empty rather than guessing.

## Student privacy

- No student last names, no photos of identifiable students, and no student email addresses or phone numbers on the site, unless a mentor confirms the family has given permission.
- Adult leaders are listed only with their consent.
- Images need real `alt` text that describes what is shown, never a student's full name.

## House style

- **Design tokens first.** Colors, fonts, sizes, and spacing are CSS custom properties in `tokens.css`. Use them; do not paste hex values into rules.
- Brand colors: forest green `--moss` (#254118) and black. `--leaf` is for accents on dark backgrounds. `--ember` is reserved for the hero spark and the preview badge. Do not use it anywhere else.
- Headlines are Bebas Neue (all caps by nature). Body is Source Sans 3. Write headlines and buttons in plain sentence case; the font handles the capitals.
- Buttons say what happens: "Join the team", "Email about sponsoring". Never "Submit" or "Click here".
- Copy is plain and specific. No hype, no filler, no exclamation marks.
- Every image needs a real `alt`, or `alt=""` if purely decorative.
- Images below the fold get `loading="lazy"` plus `width` and `height`.
- Links that leave the site get `rel="noopener" target="_blank"`.
- Links that stay on the site use the `| url` filter so they work under a path prefix.
- **No third-party requests on page load.** Fonts are self-hosted and there are no embeds, analytics, or CDN scripts. Keep it that way.
- Motion: only the hero sigil moves, and it respects `prefers-reduced-motion`. Do not add scroll or hover animations.

## Images

Resize before committing. Nothing in the build resizes images.

| Use | Max width | Format |
| --- | --- | --- |
| Hero or full-width photo | 1800px | JPEG, quality 82 |
| Photo on a page | 1400px | JPEG, quality 82 |
| Sponsor logo | 540 to 700px | PNG if it needs transparency, otherwise JPEG |

## Common jobs

Five project skills in `.claude/skills/` cover the common jobs and carry their own checklists. Use them when a request matches, rather than working from these notes: `/add-sponsor`, `/update-events`, `/add-faq`, `/add-mentor`, `/add-robot`.

**A new page:** create `src/<name>.njk` with front matter for `title`, `description`, and `permalink`, then add it to `nav` in `site.json`.

**Renaming a page:** the site has no redirect table yet. If you rename a published page, add a stub page at the old path that links to the new one, and tell the reviewer.

**Before the season starts each January:** update the home page and About copy if the team's year-specific details change, and add the new season's events to `events.json`.

## Publishing

`main` is the live site. Pushing to `main` runs `.github/workflows/deploy.yml`, which builds, checks, and deploys to GitHub Pages. The workflow also runs every morning so events move from "Coming up" to "Earlier this season" on their own.

`main` is protected: only the website maintainers can merge. A maintainer reviews the screenshots and the Cloudflare preview, then merges.

## The team logo

The dragon logo is `src/assets/img/brand/logo.png` (280px, transparent). Its dark greens disappear on black or moss, so it always sits on a light tile (`.brand__logo`) in the header and footer, or on a light section. Do not place it directly on a dark background, and do not recolor or redraw it. The favicon and touch icon are made from it.

## Open items a human has to confirm

Search the repo for these before launch:

1. Custom domain `www.maikenmagic.org` is set in `site.json` and `src/CNAME`. In GitHub Pages settings, confirm the custom domain shows a green check and Enforce HTTPS is on.
2. `.github/CODEOWNERS` contains `YOUR-ORG`. Replace it with the real GitHub organization.
3. Sponsor recognition text in `sponsors.json` is a draft. Confirm what each level really includes.
4. Event locations and links are blank. Fill them in when known.
5. Leadership titles in `leadership.json`, and whether each person agrees to be listed.
6. `site.json` `phone` is empty on purpose. Add a number only if the team wants it public.
7. `joinFormUrl` and `donateUrl` are empty, so those buttons open pre-filled emails. Add real links when they exist.
