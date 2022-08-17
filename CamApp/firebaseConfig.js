import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAcalvqz3YzTEe0tp6_22zDzTi70cVHzAA",
    authDomain: "camapp-1b8b9.firebaseapp.com",
    projectId: "camapp-1b8b9",
    storageBucket: "camapp-1b8b9.appspot.com",
    messagingSenderId: "223943785556",
    appId: "1:223943785556:web:d82e4ee0cfc10679dac1c1",
    measurementId: "G-YQF2B0GKC7"
  };

  export const app = initializeApp(firebaseConfig);
  export const analytics = getAnalytics(app);
  export const database = getDatabase(app);
  export const storage = getStorage(app);
  export const firestore = getFirestore(app)