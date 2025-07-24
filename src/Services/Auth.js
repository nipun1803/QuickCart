import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signOut,
   signInWithPopup
 } from "firebase/auth";
 import { auth, googleProvider } from "../Firebase/Config.js";
 

 export const signUp = async (email, password) => {
   try {
     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
     return userCredential.user;
   } catch (error) {
     throw error;
   }
 };
 
 export const signIn = async (email, password) => {
   try {
     const userCredential = await signInWithEmailAndPassword(auth, email, password);
     return userCredential.user;
   } catch (error) {
     throw error;
   }
 };
 
 export const logOut = async () => {
   try {
     await signOut(auth);
   } catch (error) {
     throw error;
   }
 };
 

 export const signInWithGoogle = async () => {
   try {
     const result = await signInWithPopup(auth, googleProvider);
     return result.user;
   } catch (error) {
     throw error;
   }
 };