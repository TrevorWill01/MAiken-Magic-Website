# Proposing a change

**Anyone in the organization can propose a change. A small group of maintainers approves and publishes it.** Nothing you do can put something on the live site by accident.

> **Not technical?** Read [GUIDE.md](GUIDE.md) instead. This page is the shorter, more technical version.

```
anyone in the org                  website maintainers
-----------------                  -------------------
open a pull request  --------->    review the preview
                                   approve
                                   merge  -->  live site
```

## The easy way: ask Claude

Open the repository in Claude, describe the change in plain language, or use a shortcut: `/update-events`, `/add-sponsor`, `/add-faq`, `/add-mentor`. Claude edits the right files, checks the build, and opens a pull request with screenshots. `CLAUDE.md` tells Claude where everything lives and what the house style is. Claude accounts are for adults.

## The manual way

```
git clone https://github.com/<org>/website.git
cd website
npm install

git checkout -b my-change
# edit files
npm run check
git commit -am "Describe the change"
git push -u origin my-change
```

Then open a pull request on GitHub and fill in the template.

Most content is in `src/_data/*.json`. See the table in [README.md](README.md#what-lives-where).

## What happens to your pull request

1. **Build check** runs. It fails if the site does not build, a link is broken, an image has no alt text, or a page does not have exactly one `<h1>`.
2. **Cloudflare** comments a preview link with a "Preview" badge.
3. A **maintainer** reviews and approves. They may push tweaks or ask for changes.
4. They merge, and GitHub Actions deploys in a couple of minutes.

You will not see a Merge button, and that is expected.

## Rules

- **Never commit straight to `main`.** Branch protection prevents it, but the habit matters.
- **No student last names, photos, emails, or phone numbers** without a mentor confirming permission.
- **Do not invent facts.** No made-up results, sponsors, amounts, or dates.
- **Size images before committing.** Nothing in the build resizes them. Limits are in [CLAUDE.md](CLAUDE.md#images).
- **Use the `| url` filter on internal links** so they work under a path prefix.
- **No third-party scripts, fonts, or embeds.**

To undo something already live, revert the merge commit on `main`. The next deploy restores the previous state.
