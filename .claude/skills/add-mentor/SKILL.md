---
name: add-mentor
description: Add or update an adult leader or mentor on the Team 1102 Mentors page. Use when a mentor joins, changes role, or asks to be removed.
---

# Add or update a leader

People on the Mentors page live in `src/_data/leadership.json`. Only adults who have agreed to be listed appear here. Never add a student.

Ask for anything missing:

1. **Full name**, spelled as they want it shown.
2. **Role**, for example "Mechanical Mentor". If they hold more than one, put them all in one line, such as "Treasurer and Mechanical Mentor".
3. **A short bio**, one or two sentences. If none was given, write one only from facts you were given. Otherwise leave `bio` empty and say so.
4. **Confirmation that they agree to be listed.** If you cannot tell, ask before adding them.

## Steps

1. Create a branch. Never work on `main`.
2. Add or edit the object in `src/_data/leadership.json`:

   ```json
   { "name": "Jane Doe", "role": "Mechanical Mentor", "bio": "Engineer and robotics volunteer." }
   ```

   The Mentors page shows initials in a green tile. There are no photos for individuals. If asked for a photo, say that adult photos can be added to `photos.json` as part of a team picture, and ask a mentor how they want to handle it.
3. To remove someone, delete their entry.
4. Do not add email addresses or phone numbers for individuals. Contact details belong in `site.json`.
5. Run `npm run check`, then `npm run review -- review.html --pages=/mentors/` and publish `review.html`.
6. Push the branch and open a pull request.
