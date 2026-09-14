# Alpha Sig Events — Fall 2026

A static planning page for the chapter: browse the semester calendar, filter and
vote on event ideas, and submit new social suggestions.

Plain HTML / CSS / JS — no build step. Open `index.html` locally, or view the
hosted version on GitHub Pages.

## Notes

- Votes are stored in the visitor's own browser (`localStorage`) only —
  each person's vote is private to their device.
- Event ideas submitted through the "Submit a Social Idea" form ARE shared
  chapter-wide, via Firebase (see setup below). They show up live as event
  cards for every visitor, marked "Submitted by a member."
- Drop `crest.jpeg`, `letters.jpeg`, and `seal.jpeg` into `assets/` to replace
  the ΑΣΦ placeholders (see `assets/README-add-your-images-here.txt`).

## Member-submitted events (Firebase setup)

The site uses a free Firestore database so that when a member submits an
idea, everyone sees it — not just that one person's browser. One-time setup,
~5 minutes:

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
     }
   }
   ```

   This lets anyone read and submit event ideas, but nobody can edit or
   delete a submission once it's posted (including their own) — keeps
   the list append-only and vandalism-proof without requiring logins.
   Click **Publish**.
6. Reload the site — the submit form is now live for the whole chapter.

Without this setup, the submit form still validates input but shows an
error instead of saving, since there's nowhere shared to save it to.
