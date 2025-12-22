import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// --- THIS IS THE FINAL FIX ---
// --- Replace these placeholders with your real keys from .env.local ---
const firebaseConfig = {
  apiKey: "AIzaSyApvw_1hBVYRR0LpnchpGSyRJSBbjh6Ncc",
  authDomain: "syacofa-social-media.firebaseapp.com",
  projectId: "syacofa-social-media",
  storageBucket: "syacofa-social-media.firebasestorage.app",
  messagingSenderId: "880894093409",
  appId: "1:880894093409:web:b9cd61007f1f48eb15e220",
};

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Analytics can only run in the browser
if (typeof window !== 'undefined') {
  getAnalytics(app);
}

export { app };
