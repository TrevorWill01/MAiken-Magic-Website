# Design notes

This file is for the students and mentors who want to change how the site looks. The design here is a starting point, not a verdict. If you can make it better, open a pull request.

## The idea

M'Aiken Magic is a robotics team with a wizard's name. The site leans on that overlap in one place and keeps the rest quiet.

- **The sigil.** The hero artwork is a gear drawn as a magic circle: 24 gear teeth, a ring of invented runes, a hexagram that is also a hex nut, and a hub with an axle hole. An ember-gold spark orbits it. It draws itself once on load, then drifts. It is generated in code (`lib/sigil.mjs`), so changing the tooth count or rune seed redraws it.
- **Gear teeth.** The notched edge under some sections is a gear's teeth, or a castle wall's. It marks where one section ends.
- **Parts list.** The subteams are laid out like an engineering bill of materials, because they are a list of parts that make one robot.
- **The ladder.** On the sponsor pages, each giving level's name grows with its rank, so the type itself shows the order.
- **Leaf corners.** Buttons and panels round two opposite corners. It is the only corner shape on the site.

## Tokens

Everything visual comes from `src/assets/css/tokens.css`. Change a value there and the whole site follows.

| Token | Value | Used for |
| --- | --- | --- |
| `--moss` | `#254118` | Team green: hero, page headers, primary buttons |
| `--black` | `#000000` | Header, footer, headlines, secondary bands |
| `--fog` | `#eef1ea` | Light sections |
| `--fog-2` | `#dde4d6` | Alternate light sections |
| `--leaf` | `#24a21b` | Accent on dark backgrounds, the main "Join the team" button |
| `--ember` | `#e8a33d` | The orbiting spark and the preview badge only |

Fonts: **Bebas Neue** for headlines and **Source Sans 3** for body text. Both are open-licensed and self-hosted in `src/assets/fonts/`. Source Sans 3 stands in for Calibri from the team's brand guide, which cannot be used on the web without a license.

## Rules the design follows

- **Contrast.** Light text on moss or black, dark text on fog. Do not put `--leaf` text on `--moss`; it is for large shapes and lines only.
- **Keyboard.** Every link and button has a visible focus ring.
- **Motion.** Only the sigil moves, and `prefers-reduced-motion` turns it off. No scroll or hover animation.
- **Phones first.** Every page works at 390px wide.
- **No outside requests.** No analytics, embeds, or CDNs.
- **Writing.** Plain, specific, sentence case. A button says what happens when you press it.

## Student design challenge

Want to own the look? Some starting points, from small to large:

1. **Re-tune the palette.** Edit `tokens.css`, run `npm start`, and see if you can make it feel more like us. Check contrast before you commit.
2. **Redraw the sigil.** Change the rune seed, the tooth count, or the rings in `lib/sigil.mjs`. The dragon logo lives in `src/assets/img/brand/logo.png`. It is a small PNG, so a vector (SVG) version would let it scale cleanly. Its dark greens fade on dark backgrounds, which is why the header and footer set it on a light tile.
3. **Add team photos.** Put resized images in `src/assets/img/photos/` and list them in `src/_data/photos.json`:

   ```json
   [
     {
       "file": "pit-crew.jpg",
       "alt": "Team members and mentors working on the robot in the pit",
       "width": 1400,
       "height": 933,
       "caption": "Pit crew at GRITS"
     }
   ]
   ```

   The gallery on the About page appears as soon as the list is not empty. Ask a mentor to confirm photo permissions first.
4. **Design a new section.** Sketch it, build it as a partial in `src/_includes/partials/`, and show it at a team meeting.
5. **Run a redesign competition.** Have groups mock up the home page in Figma, Canva, or on paper. The team votes. The winner gets built.

Before you open a pull request: run `npm run check`, look at your change at phone width, and tab through it with the keyboard.
