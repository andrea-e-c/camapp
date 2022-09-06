import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

import { firebaseConfig } from "./config";

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth()
export const firebaseStorage = getStorage()