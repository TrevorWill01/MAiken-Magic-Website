---
name: add-faq
description: Add, edit, or remove a question and answer on the Team 1102 FAQ page. Use when parents, students, or sponsors keep asking the same thing.
---

# Add or edit a FAQ

FAQs live in `src/_data/faqs.json`, in the order they appear on the page.

Ask for anything missing:

1. **The question**, worded the way a parent, student, or sponsor would ask it.
2. **The answer.** If you were not given one, do not write one from general knowledge about the team. Ask. For general facts about FIRST, check firstinspires.org before you write them.

## Steps

1. Create a branch. Never work on `main`.
2. Add an object to `src/_data/faqs.json`:

   ```json
   { "q": "When and where does the team meet?", "a": "At Aiken High School. ..." }
   ```

3. Put the most-asked questions first. Keep each answer to a few sentences, in plain words. If an answer needs a link to another page, write it as plain text such as "see the sponsors page"; answers do not support HTML.
4. Do not include prices, fees, deadlines, or dates unless you were given them, and say in the pull request that they will need updating.
5. Run `npm run check`, then `npm run review -- review.html --pages=/faqs/` and publish `review.html`.
6. Push the branch and open a pull request.

## Do not

- Do not answer questions about discipline, eligibility decisions, or a specific student.
- Do not promise outcomes ("every student will compete").
