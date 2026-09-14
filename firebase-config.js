/* ==========================================================================
   FIREBASE CONFIG — fill this in with YOUR project's values.
   See README.md "Member-submitted events (Firebase setup)" for the full
   step-by-step. Short version:

   1. https://console.firebase.google.com -> Add project.
   2. Build > Firestore Database > Create database (production mode).
   3. Project settings (gear icon) > General > "Your apps" > Add app > Web (</>).
   4. Copy the firebaseConfig object it shows you and paste the values below.
      These are public identifiers, not secrets — Firestore Rules (see the
      README) are what actually control who can read/write.
   ========================================================================== */

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
