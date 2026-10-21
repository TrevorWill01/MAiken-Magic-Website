---
name: add-sponsor
description: Add or update a sponsor on the Team 1102 website. Use when someone says a company or family is a new sponsor, changes level, or wants their logo updated.
---

# Add or update a sponsor

Ask for anything missing before you start:

1. **Sponsor name**, spelled exactly as they want it shown.
2. **Giving level.** One of, lowest to highest: Apprentice, Magic Maker, Enchanter, Mage, Sorcerer, Archmage, Wizard, Dragon. If they give a dollar amount instead, map it using the `min` and `max` values in `src/_data/sponsors.json`. If the amount is not covered, ask.
3. **Logo**, if they have one. Names-only sponsors are fine.
4. **Website**, optional. Only link to the sponsor's own site.

## Steps

1. Create a branch. Never work on `main`.
2. If a logo was supplied, resize it to 540 to 700px wide and save it in `src/assets/img/sponsors/` as `<sponsor-name>.png` (PNG if it has transparency) or `.jpg`. Use lowercase letters and hyphens only.
3. In `src/_data/sponsors.json`, add an object to the matching tier's `sponsors` array:

   ```json
   { "name": "Acme Machining", "logo": "acme-machining.png", "url": "https://example.com" }
   ```

   Use `"logo": null` for a text-only sponsor. Omit `url` if there is none.
4. If the sponsor is moving levels, remove them from the old tier first.
5. Run `npm run check`, then `npm run review -- review.html --pages=/sponsors/,/` and publish `review.html`.
6. Push the branch and open a pull request. In the description, say which level you used and flag anything you were unsure about.

## Do not

- Do not invent a sponsor, a level, or a dollar amount.
- Do not promise perks beyond the `recognition` text already in `sponsors.json`.
- Do not describe a gift as tax-deductible.
