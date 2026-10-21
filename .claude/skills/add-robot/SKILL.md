---
name: add-robot
description: Add or update a past robot on the Team 1102 Robots page. Use when the team has a new season's robot, photos, or specs to publish.
---

# Add a robot

Robots live in `src/_data/robots.json`, one entry per season. The page sorts newest first.

Ask for anything missing. Never guess:

1. **Year** of the season.
2. **Robot name**, if it had one. Leave empty if not.
3. **Game name** for that season, as FIRST wrote it.
4. **Summary**, one to three plain sentences on what the robot did and how.
5. **Specs**, optional label and value pairs (drivetrain, weight, mechanisms). Only what a mentor confirms.
6. **Results**, optional. Copy from The Blue Alliance (`https://www.thebluealliance.com/team/1102/<year>`) and add nothing more.
7. **Photo**, optional. Must show the robot, not identifiable students unless a mentor confirms permission. Needs real alt text.
8. **Video or CAD link**, optional.

## Steps

1. Create a branch. Never work on `main`.
2. Resize the photo to 1400px wide, JPEG quality 82, and put it in `src/assets/img/robots/`.
3. Add an entry:

   ```json
   {
     "year": 2025,
     "name": "",
     "game": "",
     "summary": "",
     "photo": { "file": "2025.jpg", "alt": "", "width": 1400, "height": 933 },
     "specs": [{ "label": "Drivetrain", "value": "" }],
     "results": "",
     "videoUrl": "",
     "cadUrl": ""
   }
   ```

   Drop any field with no value (or leave it empty). Without a photo the page shows a year tile.
4. Run `npm run check`, then `npm run review -- review.html --pages=/robots/` and publish `review.html`.
5. Push the branch and open a pull request.
