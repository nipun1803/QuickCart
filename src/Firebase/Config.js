import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOUkwpcNgkI_a4bWYxENANHuOKRElCc1M",
  authDomain: "quickcart-36806.firebaseapp.com",
  projectId: "quickcart-36806",
  storageBucket: "quickcart-36806.firebasestorage.app",
  messagingSenderId: "705638566736",
  appId: "1:705638566736:web:62c1824b4c9de07fd7ba55"
};

// Initializing the  Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();