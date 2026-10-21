# One-time setup for administrators

Everything here is done once, by someone who can create the team's GitHub organization and manage its domain. Allow about an hour. Day-to-day work is in [GUIDE.md](GUIDE.md).

## 1. GitHub

1. Create a GitHub organization for the team (or use the foundation's). Nonprofits can apply for discounts, but nothing here requires a paid plan.
2. Create a **public** repository, for example `website`. GitHub Pages is free for public repositories. Because it is public, never commit anything private: no student information, no passwords, no keys.
3. Push this project to it:

   ```
   git init -b main
   git add .
   git commit -m "Initial site"
   git remote add origin https://github.com/<org>/website.git
   git push -u origin main
   ```

4. Replace `YOUR-ORG` in `.github/CODEOWNERS` with your organization's name and commit it.

## 2. Publish with GitHub Pages

In the repository: **Settings, Pages, Build and deployment, Source: GitHub Actions.** The first push to `main` runs `.github/workflows/deploy.yml` and publishes the site at `https://<org>.github.io/website/` until you attach a custom domain. The workflow sets the path prefix for you.

The same workflow runs every morning, so events move from "Coming up" to "Earlier this season" without anyone touching the site.

## 3. Who can publish

The goal: **anyone in the organization can propose a change; only a few people can publish one.**

1. **Create a team** named `website-maintainers` and add two or three trusted adults. The name must match `.github/CODEOWNERS`.
2. **Protect `main`.** Settings, Branches, Add branch protection rule, pattern `main`:
   - Require a pull request before merging, with 1 approval
   - Require review from Code Owners
   - Require status checks to pass, and select **build** (from the "Build check" workflow)
   - Restrict who can push to matching branches, and add `website-maintainers`
   - Do not allow bypassing the above settings
3. **Check it.** Ask an organization member who is not a maintainer to open a trivial pull request. They should see the preview, and the Merge button should be disabled.

"Restrict who can push" is the setting that does the real work. Merging is a push to `main`, so restricting pushes also restricts merging.

## 4. Preview links (optional, free)

Cloudflare builds every branch into a preview URL and comments it on the pull request.

1. Sign in at <https://dash.cloudflare.com>, then **Workers and Pages, Create, Import a repository.**
2. Authorize Cloudflare for your organization and choose this repository.
3. Settings:

   | Field | Value |
   | --- | --- |
   | Project name | `maiken-magic-website` (it must match `name` in `wrangler.jsonc`) |
   | Build command | `npm run build:preview` |
   | Deploy command | `npx wrangler deploy` (the default) |
   | Builds for non-production branches | ticked |
   | Non-production branch deploy command | `npx wrangler versions upload` (the default) |
   | Path | `/` |

Preview builds carry a gold **Preview** badge and are blocked from search engines. If you skip this step, reviewers use the screenshots Claude provides, or `npm start` locally.

## 5. Custom domain

1. Decide the web address (for example `www.maikenmagic.org`). **Register and manage the domain under the foundation's account, not a student's or an individual's**, so ownership survives graduation.
2. Add a file `src/CNAME` containing only that address, for example `www.maikenmagic.org`. Commit it.
3. At your DNS provider, add the records GitHub lists in [its custom domain guide](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site). For a `www` address that is a CNAME pointing to `<org>.github.io`.
4. In Settings, Pages, enter the domain and tick **Enforce HTTPS** once the certificate is ready.
5. Set `url` in `src/_data/site.json` to the real address. It feeds the canonical tags and the sitemap.

If the domain used to serve a different website, check whether that site sent permanent (301) redirects. Browsers cache them, and pointing the new site at the opposite host can create a redirect loop for returning visitors. Serve the new site at the same host the old one redirected to.

## 6. Claude access

Claude accounts are for adults. Decide which mentors will use Claude for routine updates, give them access, and have each one follow Part 1 of [GUIDE.md](GUIDE.md). When Claude asks to connect GitHub, an organization owner may need to approve the request once.

Check the current plan, pricing, and any nonprofit or education options with Anthropic before committing, since they change.

## 7. Before launch: confirm these

Search the repository for these and settle each with a mentor. The full list is at the end of [CLAUDE.md](CLAUDE.md).

- Real site address in `site.json`
- Leadership names and titles, and that each person agrees to be listed
- Sponsor recognition wording
- Event locations and links
- Whether to publish a phone number
- Join form and donation links, if you have them

## Checklist

- [ ] Organization and public repository created
- [ ] Code pushed to `main`
- [ ] Pages source set to GitHub Actions, first deploy green
- [ ] `website-maintainers` team created, `YOUR-ORG` replaced in CODEOWNERS
- [ ] Branch protection on `main`, checked with a non-maintainer
- [ ] Cloudflare previews connected (optional)
- [ ] Domain registered under the foundation, `src/CNAME` added, HTTPS on
- [ ] `site.json` `url` updated
- [ ] Claude access given to the mentors who will use it
- [ ] Launch confirmations done
