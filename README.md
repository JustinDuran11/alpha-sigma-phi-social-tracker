# Alpha Sig Events — Fall 2026

A static planning page for the chapter: browse the semester calendar, filter and
vote on event ideas, and submit new social suggestions.

Plain HTML / CSS / JS — no build step. Open `index.html` locally, or view the
hosted version on GitHub Pages.

## Notes

- Votes (👍 Interested / 🔥 Must Do, and theme-poll picks) are shared live
  across the whole chapter via Firebase (see setup below) — everyone sees
  the same running totals in real time.
- Event ideas submitted through the "Submit a Social Idea" form are shared
  the same way. They show up live as event cards for every visitor, marked
  "Submitted by a member."
- There's no login system, so "your" vote is tracked by a random id stored
  in your browser (`localStorage`) rather than an account. Clearing your
  browser data resets which vote is "yours," same trust level as the rest
  of this site — fine for a chapter tool, not meant to resist deliberate
  abuse.
- Drop `crest.jpeg`, `letters.jpeg`, and `seal.jpeg` into `assets/` to replace
  the ΑΣΦ placeholders (see `assets/README-add-your-images-here.txt`).

## Shared voting & submissions (Firebase setup)

The site uses a free Firestore database so that votes and submitted ideas
are shared with the whole chapter, not stuck in one person's browser.
One-time setup, ~5 minutes:

1. Go to https://console.firebase.google.com, sign in with a Google account,
   and click **Add project** (any name, e.g. "alpha-sig-events"). You can
   decline Google Analytics.
2. In the left sidebar: **Build > Firestore Database > Create database**.
   Choose **production mode** and pick any location close to your chapter.
3. Go to **Project settings** (gear icon, top left) **> General**, scroll to
   "Your apps," and click the web icon (`</>`) to register a new web app
   (any nickname — no hosting needed).
4. It'll show you a `firebaseConfig` object. Copy those six values into
   `firebase-config.js` in this repo, replacing the `YOUR_...` placeholders.
5. Back in Firestore, open the **Rules** tab and replace the contents with:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /submissions/{id} {
         allow read: if true;
         allow create: if true;
         allow update, delete: if false;
       }
       match /votes/{id} {
         allow read, write: if true;
       }
       match /themeVotes/{id} {
         allow read, write: if true;
       }
     }
   }
   ```

   `submissions` is append-only — anyone can read and submit an idea, but
   nobody can edit or delete one once it's posted (including their own),
   which keeps the list vandalism-proof without requiring logins.
   `votes` and `themeVotes` allow write too, since casting or undoing your
   own vote needs to update/delete a document — there's no login system to
   restrict that to "your own" vote at the database level (see the Notes
   above), which is an acceptable trade-off for a low-stakes chapter tool.
   Click **Publish**.
6. Reload the site — voting and the submit form are now live for the whole
   chapter.

Without this setup, votes won't count and the submit form will show an
error instead of saving, since there's nowhere shared to save to.
