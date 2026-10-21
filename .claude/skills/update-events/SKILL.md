---
name: update-events
description: Add, change, or remove a competition, open house, or other event on the Team 1102 website. Use when dates change, a new event is confirmed, or an event is cancelled.
---

# Update events

Events live in `src/_data/events.json`. The site decides for itself whether an event is "Coming up" or "Earlier this season" by comparing its end date with today, and it rebuilds every morning, so never move events between lists by hand.

Ask for anything missing:

1. **Name.** Always use the official event name exactly as The Blue Alliance (`https://www.thebluealliance.com/events/<year>`) or FIRST lists it, including capitalization and any "presented by" sponsor. Do not shorten, expand, or use a nickname, even a common one like "STING" or "SCRIW". If the event is not listed on either yet, ask for the official name.
2. **Start date and end date.** Use `YYYY-MM-DD`. For a one-day event, start and end are the same. Confirm the **year**.
3. **Type**, for example "Off-season competition", "Open house", or "Workshop".
4. **Location**, optional. Include it if you were told or if The Blue Alliance or FIRST lists it.
5. **Link**, optional. Use the organizer's official page only.

## Steps

1. Create a branch. Never work on `main`.
2. Edit `src/_data/events.json`. Each entry looks like this:

   ```json
   {
     "name": "GRITS",
     "type": "Off-season competition",
     "start": "2026-10-15",
     "end": "2026-10-17",
     "location": "",
     "url": "",
     "note": ""
   }
   ```

   Keep empty strings for fields with no value. Do not write "TBD".
3. For a changed date, edit the existing entry instead of adding a second one.
4. For a cancellation, delete the entry unless the team wants it shown. If it should stay visible, put the reason in `note` and ask first.
5. Do not add results, rankings, or awards. If asked, say these should come from The Blue Alliance (`https://www.thebluealliance.com/team/1102/<year>`) and ask what to include.
6. Run `npm run check`, then `npm run review -- review.html --pages=/events/,/` and publish `review.html`.
7. Push the branch and open a pull request. List every date you changed, old and new, in the description.

## Double-check

Dates are the easiest thing to get wrong. Read each one back in your reply as a day of the week and a date (for example "Saturday, Oct 10") so the reviewer can catch a typo.
