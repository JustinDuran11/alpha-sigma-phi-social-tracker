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
  apiKey: "AIzaSyDPT2UEOXCoG6-VPXUd325tuEPD4lhiMFc",
  authDomain: "alphasigma-phi.firebaseapp.com",
  projectId: "alphasigma-phi",
  storageBucket: "alphasigma-phi.firebasestorage.app",
  messagingSenderId: "513474908946",
  appId: "1:513474908946:web:a5189cd8e2cfdd4483d9cb"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
