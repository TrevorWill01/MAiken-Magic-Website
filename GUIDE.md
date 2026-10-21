# How to change the M'Aiken Magic website

You do not need to know how to code. You describe the change in plain English, look at a picture of the result, and a maintainer publishes it.

**You cannot break the live site.** Nothing goes public until a maintainer approves it, and any change can be undone in about a minute.

Most changes take about five minutes.

## Who does what

| You are | What you do |
| --- | --- |
| **An adult mentor or volunteer** | Ask Claude for the change (Part 2), or send a request form (Part 4). |
| **A student** | Send a request form (Part 4) or ask a mentor. To work on the site's design or code, see [DESIGN.md](DESIGN.md). |
| **A website maintainer** | Review the preview and press Merge. |

Claude accounts are for people 18 and older. Students under 18 should not set up their own Claude account for this; a mentor can make the request on their behalf, and students are welcome to work on the code directly through GitHub.

## Part 1: One-time setup (about ten minutes)

1. **Get a GitHub account.** GitHub is where the website's files live. Sign up free at <https://github.com/signup>.
2. **Get added to the team.** Send your GitHub username to the team email or a mentor. They will invite you to the organization. Accept the invitation from your email.
3. **Get access to Claude.** Ask a mentor which Claude account to use. Menus change, so if what you see differs from the steps below, ask a mentor.
4. **Let Claude see the website files.** In Claude, open the code or projects area, connect GitHub when asked, and when GitHub asks which repositories Claude may use, choose this website's repository. Approving this lets Claude save a change onto a branch and open a pull request. It does **not** let Claude publish. Only a maintainer pressing Merge can do that.

You are done when the website's repository appears in your list of projects.

## Part 2: Make your first change

Say you want to add a new event.

**Step 1: Open the website project** in Claude.

**Step 2: Say what you want**, the way you would say it to a person:

> The GRITS event moved to November 6 to 8. Please update the events page.

For a photo or logo, drag it into the chat. Send the biggest version you have; it is easy to make a photo smaller but not larger.

If you would rather be walked through it, type `/update-events`, `/add-sponsor`, `/add-faq`, or `/add-mentor` and Claude will ask for each piece.

**Step 3: Wait a minute.** Claude edits the files, checks that nothing is broken, and puts the change forward for approval.

**Step 4: Look at the result.** Claude's reply links to pictures of the pages it changed, at computer and phone size. The pull request also gets a **preview link**, a minute or so later. That is the real website with your change in it. A small gold "Preview" badge in the corner tells you it is not the live site.

**Step 5: Ask for tweaks.** Go back to the chat:

> Her title should be "Senior Mechanical Engineer."

Claude updates the same request. Nothing is public yet, so repeat as often as you like.

**Step 6: Ask a maintainer to publish it.** Send them the pull request link. They check it and press Merge. Your change is live in about two minutes. You will not see a Merge button yourself, and that is on purpose.

## Part 3: What people ask for most

| You want to | Say |
| --- | --- |
| Add or change an event date | `/update-events`, or "The Pembroke event moved to March 28 to 29." |
| Add a sponsor | `/add-sponsor`, or "Acme Machining is a new Wizard-level sponsor, logo attached." |
| Answer a question parents keep asking | `/add-faq`, or "Add an FAQ about what students should bring." |
| Add or update a mentor | `/add-mentor`, or "Add Jane Doe as Mechanical Mentor." |
| Fix a typo | "On the FAQ page, 'recieve' should be 'receive'." |
| Replace a photo | "Replace the photo on the About page with this one," then drag it in. |

## Rules that keep students safe

- No student last names, photos, emails, or phone numbers on the site unless a mentor confirms the family gave permission.
- Adults are listed only if they agree.
- Claude will not make up results, sponsors, or dollar amounts. If it asks you a question, that is why.

## Part 4: If you would rather not use Claude

Open a request form and a maintainer will do it:

**Issues, then New issue, then "Request a website change"** in the website's repository on GitHub. Fill it in and attach any photos.

## If something goes wrong

- **"I do not see the repository in Claude."** Check that you accepted the GitHub invitation, that the repository opens when you are signed in to GitHub, and that you ticked the repository when Claude asked which ones it may use.
- **"It says an organization owner has to approve it."** Send the request from that screen, then tell a mentor so someone says yes. This only happens once.
- **"Claude says a check failed."** Say "that check failed, can you fix it?" It can read the error.
- **"The preview link does not work yet."** It takes a minute or two. Refresh the pull request page.
- **"I published something wrong."** Tell a maintainer right away. It can be undone in about a minute.
- **"Claude changed more than I asked."** Say "only change the events page, put the rest back."

## The words GitHub uses

You can ignore these, but in case you see them:

| Word | What it means here |
| --- | --- |
| Repository | The folder that holds the website's files |
| Branch | A private copy of the site where your change waits to be approved |
| Pull request | A change waiting for approval |
| Merge | Approving it. This is what makes it live |
| Main | The version that is live right now |
